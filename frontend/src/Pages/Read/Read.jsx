import { useNavigate } from "react-router-dom";

const Read = () => {

  // const {id} = useParams()

  const nav = useNavigate()

  // document.dispatchEvent(new CustomEvent("reading", null))

  return (
    <h1 onClick={() => {document.dispatchEvent(new CustomEvent("reading", {detail : undefined})) ; nav("/")}}>hello</h1>
   );
}
 
export default Read;