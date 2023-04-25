import React, {  useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [images, setImages] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [showBookMarkedImages1,setShowBookMarkedImages1] = useState(false)
  const [bookMarkedImages,setBookMarkedImages] = useState([])

  const handleClick = async (searchText) => {
    setShowBookMarkedImages1(false)
    setIsFetching(true);
    const data = await axios.get(
      `https://api.unsplash.com/search/photos/?client_id=vR8ez1POi9OL6aFkRZK6BRbnCixuwHhMMI0Wm1W_J9A&page=1&per_page=24&query=${searchText}`
    );
    setIsFetching(false);
    setImages(data.data.results);
  };

  const addToBookmark = (image) =>{
    if(!bookmarks.includes(image)){
        setBookmarks([...bookmarks, image]);
    }
  }

  const removeFromBookmark = (image) =>{
    if(bookmarks.includes(image)){
        setBookmarks(bookmarks.filter((bookmark) => bookmark !== image));
        setBookMarkedImages(bookmarks.filter((bookmark) => bookmark !== image))
    }
  }

  const showBookMarkedImages = () =>{
    setBookMarkedImages(bookmarks)
    setShowBookMarkedImages1(true)
  }


  return (
    <div className="image-search-page">
      <div className="container">
        <h1 className="image-search-title">React Photo Search</h1>
        <button className="bookmarks-button" onClick={showBookMarkedImages}>Bookmarks</button>
      </div>

      <div className="search-container">
        <input
          placeholder="Search free high resolution images"
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="search-button"
          onClick={() => handleClick(searchText)}
        >
          Search
        </button>
      </div>
      <div className="images-container">
        {isFetching && <div>Loading...</div>}
        {!showBookMarkedImages1 && !isFetching &&
          images?.map((image, index) => (
            <div className="image-container" key={index}>
              <img
                src={image.links.download + "&w=300"}
                alt=""
                className="searched-image"
              />
              <div className="bookmark-buttons">
                <button onClick={()=>addToBookmark(image)}>Add Bookmark</button>
              </div>
            </div>
          ))}
          {showBookMarkedImages1 && bookMarkedImages?.map((image, index) => (
            <div className="image-container" key={index}>
              <img
                src={image.links.download + "&w=300"}
                alt=""
                className="searched-image"
              />
              <div className="bookmark-buttons">
                <button onClick={()=>removeFromBookmark(image)}>Remove Bookmark</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
