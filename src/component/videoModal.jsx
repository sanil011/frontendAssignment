import Modal from '@mui/material/Modal';
import {Card} from '@mui/material';
import ReactPlayer from 'react-player'
import React, { useState } from 'react'
import { useGlobalContext } from '../context/globalContext';
import { useSelector, useDispatch } from 'react-redux';
import { appActions } from '../store/appSlice';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    maxWidth: "650px",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

const VideoModal = () => {
  const { popover, link } = useSelector((state) => state.app)
  const { setReload } = useGlobalContext();
    const dispatch = useDispatch();
  console.log(popover)
  console.log(link)
  return (
      <div>
          <Modal
              open={popover}
              onClose={() => (dispatch(appActions.Modal({popover:false,link:""})), setReload(true))}
          >
        <Card sx={style}>
          
          <ReactPlayer playing controls muted={true} url={link} />
              </Card>
          </Modal>
    </div>
  )
}

export default VideoModal