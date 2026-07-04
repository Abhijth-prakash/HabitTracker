import { useParams } from "react-router-dom"


const Edit = () => {
    const {id} = useParams()
  return (
    <div><p> this is habit{id}</p></div>
  )
}

export default Edit