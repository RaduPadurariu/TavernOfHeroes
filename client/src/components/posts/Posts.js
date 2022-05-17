import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Post from './Post';
import { getPosts } from '../../actions/post';
import { loadUser } from '../../actions/auth';

const Posts = ({ loadUser, getPosts, post: { posts, loading } }) => {
	useEffect(() => {
        loadUser();
		getPosts();
	}, [getPosts, loadUser]);
	return loading ? (
		<Spinner />
	) : (
		<div className="container">
			<div className="posts">
                <div>
                        <p className="lead text-primary">Posts</p>
                </div>       
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
});

export default connect(mapStateToProps, { loadUser, getPosts })(Posts);