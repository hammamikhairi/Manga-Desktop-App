package service

import (
	"fmt"
	"net/http"
	"strings"

	"manelo/backend/models"

	"github.com/PuerkitoBio/goquery"
)

func SearchManga(uri, query string) ([]models.SearchResult, error) {
	url := fmt.Sprintf("%s/search/%s", uri, query)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, err
	}

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		return nil, err
	}

	var mangaList []models.SearchResult

	doc.Find(".panel_story_list .story_item").Each(func(index int, item *goquery.Selection) {
		id, _ := item.Find("a:first-of-type").Attr("href")
		image, _ := item.Find("a:first-of-type img").Attr("src")
		title := item.Find("h3 a").Text()

		id = strings.Split(strings.TrimSpace(id), "/")[2]
		mangaList = append(mangaList, models.SearchResult{
			ID:    id,
			Image: image,
			Title: title,
		})
	})

	return mangaList, nil
}

func GetManga(uri, id string) (models.MetaData, error) {
	url := fmt.Sprintf("%s/manga/%s", uri, id)

	resp, err := http.Get(url)
	if err != nil {
		return models.MetaData{}, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return models.MetaData{}, err
	}

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		return models.MetaData{}, err
	}

	target := doc.Find(".manga-info-top")

	imageUrl, _ := target.Find(".manga-info-pic img").Attr("src")
	metaData := models.MetaData{
		ImageURL: uri + imageUrl,
		Name:     target.Find(".manga-info-text li").Eq(0).Find("h1").Text(),
		Author:   target.Find(".manga-info-text li").Eq(1).Find("a").Text(),
		Status:   strings.TrimSpace(strings.Split(target.Find(".manga-info-text li").Eq(2).Text(), ":")[1]),
		Updated:  strings.TrimSpace(strings.Split(target.Find(".manga-info-text li").Eq(3).Text(), ":")[1]),
		View:     strings.TrimSpace(strings.Split(target.Find(".manga-info-text li").Eq(5).Text(), ":")[1]),
	}

	genresText := target.Find(".manga-info-text li").Eq(6).Text()
	genres := strings.Split(strings.TrimSpace(strings.Split(genresText, ":")[1]), ",")
	for i := range genres {
		genres[i] = strings.TrimSpace(genres[i])
	}
	metaData.Genres = genres

	// Assuming req.chapterList is available as JSON in the request body
	var chapterList []models.ServiceChapter
	doc.Find(".chapter-list .row").Each(func(index int, item *goquery.Selection) {
		link := item.Find("span a")
		href, _ := link.Attr("href")
		chapterList = append(chapterList, models.ServiceChapter{
			ID:        strings.Split(href, "/")[3],
			Path:      href,
			Name:      link.Text(),
			View:      strings.TrimSpace(item.Find("span").Eq(1).Text()),
			CreatedAt: strings.TrimSpace(item.Find("span").Eq(2).Text()),
		})
	})

	metaData.ChapterList = chapterList

	return metaData, nil
}

func GetChapter(uri, path string) (models.Assets, error) {
	url := fmt.Sprintf("%s%s", uri, path)

	resp, err := http.Get(url)
	if err != nil {
		return models.Assets{}, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return models.Assets{}, err
	}

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		return models.Assets{}, err
	}

	target := doc.Find(".trang-doc")

	// Extract title and current chapter
	breadcrumbText := target.Find(".breadcrumb .rdfa-breadcrumb").Text()
	breadcrumbParts := strings.Split(strings.TrimSpace(strings.ReplaceAll(breadcrumbText, "\n", "")), "»")

	assets := models.Assets{
		Title:          strings.TrimSpace(breadcrumbParts[3]),
		CurrentChapter: strings.TrimSpace(breadcrumbParts[4]),
	}

	// Extract chapter list IDs
	target.Find(".option_wrap #c_chapter option").Each(func(index int, item *goquery.Selection) {
		value, _ := item.Attr("value")
		name := item.Text()
		assets.ChapterListIds = append(assets.ChapterListIds, models.ReadingChapter{
			ID:   value,
			Name: name,
		})
	})

	// Extract images
	target.Find(".vung-doc img").Each(func(index int, item *goquery.Selection) {
		title, _ := item.Attr("title")
		image, _ := item.Attr("data-src")
		assets.Images = append(assets.Images, models.Image{
			Title: title,
			Image: image,
		})
	})

	return assets, nil

}
