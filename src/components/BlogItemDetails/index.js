// Write your JS code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class BlogItemDetails extends Component {
  state = {
    isLoading: true,
    blogsData: [],
  }

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedData = {
      title: data.title,
      imageUrl: data.image_url,
      content: data.content,
      avatarUrl: data.avatar_url,
      author: data.author,
    }

    this.setState({blogsData: updatedData, isLoading: false})
  }

  renderBlogItemDetails = () => {
    const {blogsData} = this.state
    const {imageUrl, title, avatarUrl, author, content} = blogsData

    return (
      <div className="blog-des-container">
        <h1 className="blog-title-big">{title}</h1>
        <div className="blog-author-details">
          <img src={avatarUrl} className="author-pic" alt={author} />
          <p className="author-name"> {author} </p>
        </div>
        <img src={imageUrl} alt={title} className="title-image" />
        <p className="blog-des">{content} </p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="blog-item-details-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bbff" height={50} width={50} />
          </div>
        ) : (
          this.renderBlogItemDetails()
        )}
      </div>
    )
  }
}

export default BlogItemDetails
