import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    title: " ",
    message: " ",
    tags: " ",
    selectedFile: null,
  });
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId !== 0) {
      dispatch(updatePost(currentId,{ ...postData , name : user?.result?.name}));
    } else {
      dispatch(createPost({ ...postData , name : user?.result?.name}, navigate ));
    }
    clear();
  };
  
  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: " ",
      message: " ",
      tags: " ",
      selectedFile: null,
    });

  };
  if( !user?.result?.name){
    return (
      <Paper className={classes.paper} raised elevation={6}>
        <Typography variant="h5" align="center" >
          Please Sign in to create own memories and like other's memories
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper} raised elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{ currentId ? 'Editing ' : 'Creating ' } a Memory</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
