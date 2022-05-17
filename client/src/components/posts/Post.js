import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

const Post = ({
	auth,
	post: { _id, text, name, avatar, user, likes, comments, date },
}) => (
	<div class="post p-1 my-1">
		<div>
			<a href="profile.html">
				<img class="round-img" src={avatar} alt="" />
				<h4>{name}</h4>
			</a>
		</div>
		<div>
			<p class="my-1">{text}</p>
			<p class="post-date">
				Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
			</p>
            <div className='post-btns'> 
                <div>
                    <button type="button" class="btn btn-primary">
                        <AiFillLike />
                        <span>{likes.length > 0 && ' ' + likes.length}</span>
                    </button>
                    <button type="button" class="btn btn-primary">
                        <AiFillDislike />
                    </button>
                </div>
                <div>
                    {comments.length > 0 && (
                        <Link to={`/post/${_id}`} class="btn btn-primary">
                            See more <span class="comment-count">{' ' + comments.length}</span>
                        </Link>
                    )}

                    {!auth.loading && user === auth.user._id && (
                        <button type="button" class="btn btn-danger">
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
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(Post);