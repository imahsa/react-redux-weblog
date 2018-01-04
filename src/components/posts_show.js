import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchPost} from '../actions';



class PostsShow extends Component {
  componentDidMount() {
    // This is a props that we have access to because of react-router
    // param is what our URL have
    const { id } = this.props.match.params;
    console.log({id});
    this.props.fetchPost(id);
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

export default connect(mapStateToProps, { fetchPost })(PostsShow);
