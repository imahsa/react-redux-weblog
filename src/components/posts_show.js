import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchPost} from '../actions';
import {deletePost} from '../actions';



class PostsShow extends Component {
  componentDidMount() {
    // Caching
    if(!this.props.post){
      // This "params" is a props that we have access to because of react-router
      // param is what our URL have
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    //Since this deletePost is an action creator we can call it from this.props
    this.props.deletePost(id, () =>{
      this.props.history.push('/');
    });
  }

  render() {
    {/* this.props === ownProps*/}
    const { post } = this.props;

    if(!post) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Link to="/" className="btn btn-primary"> Back to index </Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// The first arg is always the application state
// Now our component is going to have the only post we want
// whenever the component is going to re render
// the mapStateToProps is called to figure out what props this compoent needs
// and the "ownProps" is all the props that is headed to above component
function mapStateToProps({ posts }, ownProps) {
  return {post: posts[ownProps.match.params.id]};

}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
