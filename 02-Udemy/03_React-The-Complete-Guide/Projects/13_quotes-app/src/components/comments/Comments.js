import {useEffect, useState, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import {getAllComments} from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {quoteId} = params;
  const {sendRequest, status, data: loadedComments} = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const handleAddedComment = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments =
    status === 'pending' ? (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    ) : status === 'completed' ? (
      loadedComments && loadedComments.length > 0 ? (
        <CommentsList comments={loadedComments} />
      ) : (
        <p className='centered'>No comments were added yet!</p>
      )
    ) : (
      ''
    );

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={quoteId} onAddedComment={handleAddedComment} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
