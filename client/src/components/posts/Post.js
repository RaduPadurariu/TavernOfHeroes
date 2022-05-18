import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import { addLike, unLike, updatePost, deletePost } from '../../actions/post';

const Post = ({
    addLike,
	unLike,
    updatePost,
    deletePost,
	auth,
	post: { _id, title, text, name, avatar, user, likes, date },
}) => {
	const [newTitle, setTitle] = useState(title);
	const [newText, setText] = useState(text);
	const [isEditing, setEditing] = useState(false);
	return (
		<div className="post p-1">
		<div>
				<img className="round-img" src={avatar} alt="" />
				<h4>{name}</h4>
		</div>

		<div className='post-components'>
				{isEditing ? (
					<Fragment>
						{' '}
						<form
							className="form my-1"
							onSubmit={(e) => {
								e.preventDefault();
								console.log(_id, newTitle, newText);
								updatePost(_id, { title: newTitle, text: newText });
								// clear the form
								setEditing(!isEditing);
							}}
						>
							<input
								className="my-1 post-input-edit"
								style={{ borderStyle: 'none' }}
								type="text"
								placeholder="Post title"
								name="title"
								value={newTitle}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
							<textarea
								className="post-input-edit"
								style={{ borderStyle: 'none' }}
								name="text"
								cols="30"
								rows="3"
								placeholder="Description"
								value={newText}
								onChange={(e) => setText(e.target.value)}
								required
							></textarea>
							<input
								type="submit"
								className="btn btn-primary my-1"
								value="Update post"
							/>
						</form>
					</Fragment>
				) : (
					<Fragment>
						<h2 className="my py wrap-text post-content" >{newTitle}</h2>
						<div className="my py wrap-text post-content">{newText}</div>
						
					</Fragment>
				)}
				<div className="post-btns">
					{auth.isAuthenticated && !auth.loading && (
						<Fragment>
								<div>
									<button
										type="button"
										className="btn btn-primary"
										onClick={() => {
											addLike(_id);
										}}
									>
										<AiFillLike />
										<span>{likes.length > 0 && <span>{likes.length}</span>}</span>
									</button>
									<button
										type="button"
										className="btn btn-primary"
										onClick={() => unLike(_id)}
									>
										<AiFillDislike />
									</button>
									{user === auth.user._id && (
										<Fragment>
											<button
												onClick={(e) => setEditing(!isEditing)}
												type="button"
												className="btn btn-primary"
											>
												<MdOutlineEdit />
												Edit
											</button>
											<button
												onClick={() => deletePost(_id)}
												type="button"
												className="btn btn-danger"
											>
												<MdOutlineDelete />
												Delete
											</button>
											
										</Fragment>
										
									)}
								</div>
							
						</Fragment>
					)}
					<p className="post-date">
						Posted on <Moment format="YYYY/MM/DD HH:mm">{date}</Moment>
					</p>

				</div>
			
			</div>
		</div>
);};

Post.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
	unLike: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {
	addLike,
	unLike,
	updatePost,
	deletePost,
})(Post);