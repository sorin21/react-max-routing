import React, {Component} from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import  './Posts.css';
class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log(this.props);
    axios.get("/posts")
      .then(response => {
        // console.log("response", response);
        // Fetch only the first 4 elements form server
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            // distribute the property of the post
            // that we get from the server
            ...post,
            author: "Kido"
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        console.log("Error", error);
        // this.setState({ error: true });
      });
  }

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id })
  };

  render() {

    let posts = <p style={{ textAlign: 'center', color: 'red' }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return <Post 
          title={post.title} 
          key={post.id} 
          author={post.author} 
          clicked={() => this.postSelectedHandler(post.id)}
          {...this.props} />;
      });
    }

    return(
      <section className="Posts">{posts}</section>
    );
  }
}

export default Posts;