import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  render() {
    return (
      <div>
        <h3>Posts</h3>
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
