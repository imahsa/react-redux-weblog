import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';


class PostsIndex extends Component {
  //This function is a good place for fetching data from API
  componentDidMount() {
      this.props.fetchPosts();
    }

  renderPosts() {
    /**Since this.props.posts is an object
    we can not use .map(), it is for arryas
    so we use _.map
    **/
    return _.map(this.props.posts, post => {
      return(
        <li className="list-group-item" key={post.id}>
          {post.title}
        </li>
      );
    });
  }
//This link is like <a> anchor tag in html
  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add  Post
          </Link>
        </div>
        <h3>Posts</h3>
        {/* this is comments*/}
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

//As we want to use application state:
function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
