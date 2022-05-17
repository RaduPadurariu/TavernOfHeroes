import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { addLike, unLike } from '../../actions/post';

const Post = ({
    addLike,
	unLike,
	auth,
	post: { _id, text, name, avatar, user, likes, comments, date },
}) => (
	<div className="post p-1 my-1">
		<div>
			<a href="profile.html">
				<img className="round-img" src={avatar} alt="" />
				<h4>{name}</h4>
			</a>
		</div>
		<div>
			<p className="my-1">{text}</p>
			<p className="post-date">
				Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
			</p>
            <div className='post-btns'> 
                <div>
                <button
				type="button" className="btn btn-primary" onClick={() => { addLike(_id);}}>
                        <AiFillLike />
                        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => {unLike(_id)}}>
                        <AiFillDislike />
                    </button>
                </div>
                <div>
                <Link to={`/posts/${_id}`} className="btn btn-primary">
				    More details...{' '}
				    {comments.length > 0 && (
					    <span className="comment-count">{comments.length}</span>
				    )}
			    </Link>

                    {!auth.loading && user === auth.user._id && (
                        <button type="button" className="btn btn-danger">
                            <MdOutlineDelete />
                            Delete
                        </button>
                    )}
                </div>
            </div>  
		</div>
	</div>
);

Post.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
	unLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, unLike })(Post);