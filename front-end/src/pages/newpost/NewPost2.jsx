import { Button } from '../../components/Button'
import "./NewPost2.css"
import { Avatar } from "@mui/material"
import { useState } from "react";
import { useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
//import { post } from '../../../../back-end/app';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter'
// import Code from '@ckeditor/ckeditor5-basic-styles/src/code'
// import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
// import Image from '@ckeditor/ckeditor5-image/src/image'
// import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
// import Indent from '@ckeditor/ckeditor5-indent/src/indent'
// import List from '@ckeditor/ckeditor5-list/src/list'
// import Heading from '@ckeditor/ckeditor5-heading/src/heading'

const NewPost2 = ({ loggedIn }) => {
    const url = 'http://localhost:4000/userAccount'

    const[postData, setPostData] = useState({ //local post model
        title: '',
        content: '',
        date: '',
        username: '', 
        coursename: '', 
        avatar: '',
        imgSrc: '',
    })
    
    const[loading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true;
        async function fetchaccount() {
            let token = localStorage.getItem('token')
            
            try {
                await axios.get(url, {headers:{'Token':token}}).then(response => {
                    if(isMounted){
                        setPostData({
                            username: response.data.username,
                            avatar: response.data.avatar,
                        })
                        setIsLoading(false)
                    }
                });
            } catch (error) {
                console.log(error)
            }

        }
        fetchaccount()
        
        return () => {isMounted=false};
    },[])

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (course) => {
        setAnchorEl(null);
        setPostData({...postData, coursename: course})
    };

    let history = useHistory(); //jump to home

    //create date
    var today = new Date(); 
    var course = '';

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!postData.title)
            alert('please type in title')
        if(!postData.content)
            alert('please type in text')
        if(!postData.coursename)
            alert('please select a channel')

        //send postData to server
        axios.post('http://localhost:4000/homeposts',postData)
            .then(response=>{
                console.log(response);
            })
            .catch((err) => console.log(err.message))
        //jump back to home
        history.push('/')
    }
    
    return (
        <>
        {!loading && <div className="newPostPage">
            <div className="newPostCenter">
                <div className="postPageTitle">
                    Create a Post
                </div>
                <div className="channelAndUser">
                    <div className="channelSelect">
                        <Button className="channelButton"
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            Channel <span className="plusSign">+</span>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() =>
                                handleClose('Mathmatics')
                            }>Mathematics</MenuItem>
                            <MenuItem onClick={() =>
                                handleClose('Engineering')
                            }>Engineering</MenuItem>
                            <MenuItem onClick={() => 
                                handleClose('English')
                            }>English</MenuItem>
                            <MenuItem onClick={() =>
                                handleClose('Neuroscience')
                            }>Neuroscience</MenuItem>
                        </Menu>
                    </div>
                    <div className="avatarAndUser">
                        <Avatar className="avatarIcon"
                            sx={{ width: 30, height: 30 }} src = 'https://robohash.org/etiustodolorum.png?size=50x50&set=set1' >
                        </Avatar>
                        <p className="postUserName">{postData.username}</p>
                    </div>

                </div>
                <form onSubmit = { handleSubmit }>
                <div className="titleAndContent">
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Title"
                            value={postData.title || ''}
                            onChange={(e) => setPostData({...postData, title: e.target.value})}
                        />
                    </div>
                    <div className="ckeditor">
                        <div className="textEditor">
                            <div className="editor">
                                
                            <CKEditor
                                editor={ClassicEditor}
                                data={postData.content}
                                onChange={(event, editor) => {
                                    const data = editor.getData()
                                    setPostData({...postData, content: data, date: today})
                                }}
                            />
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className="buttonSection">
                    <Button type = "button" className="draftButton" onClick = {() => alert('Draft saved')}>
                        Draft
                    </Button>
                    <Button type = "submit" className="postButton" buttonStyle="btn--dark--solid">
                        Post
                    </Button>
                </div>

                </form>
            </div>

        </div>}
        </>
    )
}

export default NewPost2