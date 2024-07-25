package utils

import (
	"fmt"
)

func DBUG(name string, v interface{}) {
	fmt.Printf("======= %s: =======\n", name)
	fmt.Printf("%+v\n", v)
}
