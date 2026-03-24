import { useState } from "react"

const SearchDonations = () => {

  const [formData,setFormData]=useState({
    organType:"",
    bloodGroup:"",
    lat:"",
    lng:""
  })

  
  return (
    <div>
      Hi search donations here
    </div>
  )
}

export default SearchDonations
