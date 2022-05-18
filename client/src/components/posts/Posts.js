import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Post from './Post';
import { getPosts } from '../../actions/post';
import { loadUser } from '../../actions/auth';
import PostInput from './PostInput';

const Posts = ({ auth, loadUser, getPosts, post: { posts, loading } }) => {
	useEffect(() => {
        if (auth.isAuthenticated) loadUser();
		getPosts();
	}, [getPosts, loadUser]);
	return loading ? (
		<Spinner />
	) : (
		<div className="container post-container">
           
			<div className="posts">
                <div>
                    <h1 className="largey text-primary">Posts</h1>
                </div>  
				<PostInput />     
				{posts.map((post) => (
					<Post key={post._id} post={post} />
				))}
			</div>
		</div>
	);
};

Posts.propTypes = {
    loadUser: PropTypes.func.isRequired,
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
    auth: state.auth,
});

export default connect(mapStateToProps, { loadUser, getPosts })(Posts);