import React, { useState, useRef, useEffect } from 'react'
import Slider from "react-slick";
import art1 from '../assets/images/art-1.jpg'
import art2 from '../assets/images/art-1.jpg'
import art3 from '../assets/images/art-3.jpeg'
import art4 from '../assets/images/art-4.jpg'
import art5 from '../assets/images/art-3.jpeg'
import art6 from '../assets/images/art-4.jpg'
import art7 from '../assets/images/art-8.jpg'
import art8 from '../assets/images/art-8.jpg'
import '../App.css'
import { Button, Card, Form, FormControl } from 'react-bootstrap';
import Xarrow from "react-xarrows";
import "./audiopane/player.css"

import {
    BsPlayFill, BsArrowCounterclockwise, BsInstagram, BsPinterest, BsTwitter, BsFacebook, BsLinkedin, BsPin
} from 'react-icons/bs'

import Player from "./audiopane/Player"

import { FacebookButton, FacebookCount, LinkedInButton, PinterestButton, TwitterButton } from "react-social";
import { ShareModal } from './ShareModal';

let url = 'https://www.youtube.com/watch?v=7sDY4m8KNLc'

const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="slick-prev" onClick={onClick} style={{ backgroundColor: 'black' }}>
            <i className="fa fa-angle-left"></i>
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="slick-next" onClick={onClick} style={{ backgroundColor: 'black' }}>
            <i className="fa fa-angle-right"></i>
        </div>
    );
};

const MediaNew = () => {
    const [inputValue, setInputValue] = useState('');
    const [file, setFile] = useState(null);
    const [openModal, setOpenModal] = useState(false)

    const [ImageSlideIndex, setImageSlideIndex] = useState(0);
    const [images, setImages] = useState([art1, art2, art3, art4, art5, art6, art7, art8]);
    const [isImageDisabled, setIsImageDisabled] = useState(false);

    const [selectedImages, setSelectedImages] = useState([]);
    // TODO limit to 5 images selection
    const handleDoubleClick = (e, image) => {
        if (!selectedImages.includes(image)) {
            setSelectedImages([...selectedImages, image]);
        }
        e.stopPropagation();
    }

    const fileInput = useRef(null);


    const handleLocalFile = (e) => {
        setFile(e.target.files[0]);
        console.log(file)
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
        console.log(file)
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const ImageSettings = {
        className: "center",
        infinite: true,
        // centerPadding: "150px",
        centerMode: true,
        slidesToShow: 5,
        swipeToSlide: true,
        beforeChange: (current, next) => setImageSlideIndex(next),
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };


    useEffect(() => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '2000295180316635',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v9.0'
            });
        };

        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }, []);

    function handleDialogSubmit() {
        const shareUrl = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F10%2F30%2F20%2F13%2Fsunrise-1014712__340.jpg&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Ftravel%2F&tbnid=dctj2hvPIOUsOM&vet=12ahUKEwiCj9CGrav9AhVhBbcAHe9DCYEQMygGegUIARDqAQ..i&docid=3BGevZRbGgzN-M&w=515&h=340&q=images&ved=2ahUKEwiCj9CGrav9AhVhBbcAHe9DCYEQMygGegUIARDqAQ';
        const shareCaption = 'caption';
        const shareTitle = 'title';

        window.FB.api(
            '/me/feed',
            'POST',
            {
                url: shareUrl,
                caption: shareCaption,
                published: true
            },
            function (response) {
                console.log(response);
            }
        );
        console.log('test')
    }

    const [width, setWindowWidth] = useState(0)
    // useEffect(() => {

    //     updateDimensions();

    //     window.addEventListener('resize', updateDimensions);
    //     return () =>
    //         window.removeEventListener('resize', updateDimensions);
    // }, [])
    // const updateDimensions = () => {
    //     const width = window.innerWidth
    //     setWindowWidth(width)
    // }

    useEffect(() => {
        const mobileScreen = window.matchMedia("(max-width: 767px)");

        const handleMobileScreen = (mobileScreen) => {
            console.log(mobileScreen.matches)
            const body = document.querySelector('body');
            if (mobileScreen.matches) {
                setWindowWidth(true)
            } else {
                setWindowWidth(false)
            }
        };

        handleMobileScreen(mobileScreen);
        mobileScreen.addEventListener('change', handleMobileScreen);

        return () => {
            mobileScreen.removeEventListener('change', handleMobileScreen);
        };
    }, []);


    console.log(width)
    const responsive = {
        // showFirst: width > 810,
        showFirst: width

    }

    return (
        <div class="container-fluid">
            <div class="row" style={{ height: '100vh' }}>
                <div class="col-2" style={{ margin: 'auto', display: responsive.showFirst ? 'none' : 'flex' }}>
                    <Card className='shadow-lg'>
                        <Card.Body>
                            <textarea
                                rows={5}
                                style={{ width: '100%', resize: 'none' }}
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                placeholder='Enter prompt text here'
                            />
                            <h5>File Drop Box</h5>
                            <Form>
                                <FormControl
                                    type="file"
                                    onChange={handleLocalFile}
                                    style={{ display: 'none' }} // Hide the input element
                                    ref={fileInput}
                                />
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    style={{
                                        border: 'dashed gray 4px',
                                        padding: '4px',
                                        width: '100%    ',
                                        height: '100px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        overflow: 'hidden'
                                    }}
                                    onClick={() => fileInput.current.click()}
                                >
                                    <p>Images, Audio,
                                        Video, Text, JSONPDF, Doc, PPT
                                        Folder (Ctrl+Multi)
                                        GDrive/Dropbox</p>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
                <div class="col-1" style={{ margin: 'auto', marginRight: 0, display: responsive.showFirst ? 'flex' : 'none' }} >
                    <button>Input Dialog</button>
                </div>
                <div class="col" style={{ display: 'flex', alignItems: 'center' }}>
                    <div id='playButton1'>
                        <BsPlayFill class='play-btn' color='green' onClick={() => window.alert('hi')} size={100} />
                        <h5 style={{ backgroundColor: '#cccccc', padding: '5px' }}>Theme Dropbox</h5>
                    </div>
                </div>
                <Xarrow start="playButton1" end="imageSlider" />
                <div class="col-6">
                    <div class="row" style={{ height: '45vh', paddingTop: 60, display: 'flex', justifyContent: 'center' }}>
                        <div id='imageSlider' style={{ paddingTop: '40px', width: '800px' }}>
                            <div onDoubleClick={() => setIsImageDisabled(!isImageDisabled)} style={{ position: 'relative', backgroundColor: '#cccccc', height: '50%' }}>
                                <div style={{
                                    position: 'absolute', top: -30, left: 375,
                                    transform: 'rotate(-90deg)',
                                    backgroundColor: '#cccccc',
                                    borderTopRightRadius: 50,
                                    borderBottomRightRadius: 50,
                                }} >
                                    {/* <h3>Visual Panel</h3> */}
                                    <BsArrowCounterclockwise size={50} color='#8f0910' />
                                </div>
                                <div style={{ position: 'relative', top: 20, zIndex: 99, pointerEvents: isImageDisabled ? 'none' : 'auto', backgroundColor: isImageDisabled ? 'rgba(0,0,0,1)' : '#cccccc' }}>
                                    <Slider {...ImageSettings}>
                                        {
                                            images.map((image, index) => (
                                                <div key={image} onDoubleClick={(e) => {
                                                    handleDoubleClick(e, image)
                                                }} className='slick-card'>
                                                    <img className='slider-image' src={image} alt='art' />
                                                    <div className="caption">
                                                        <p>Caption</p>
                                                        <p className="additional-info">Additional information</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </div>
                            </div>
                            <div className='d-flex' style={{ alignItems: 'center' }}>
                                <div className="selected-images" style={{ backgroundColor: '#90EE90', display: selectedImages.length !== 0 ? 'block' : 'none', height: '80px', width: '400px' }}>
                                    {selectedImages.map((image, index) => (
                                        <img key={index} src={image} height='80px' width='80px' alt='img' />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row d-flex align-items-center" style={{ height: '10vh' }}>
                        <h3 style={{ textAlign: 'center' }}>
                            DreamikAI Media Synthesis
                        </h3>
                    </div>
                    <div class="row" style={{ backgroundColor: 'rgba(0,0,0,0.09)' }}>
                        <Player className="audiopanel" />
                    </div>
                </div>
                <Xarrow start="imageSlider" end="playButton2" />
                <div class="col" style={{ display: 'flex', alignItems: 'center' }}>
                    <div id='playButton2'>
                        <BsPlayFill class='play-btn' color='red' onClick={() => window.alert('hi')} size={100} />
                        <h5 style={{ backgroundColor: '#cccccc', padding: '5px' }}>Output Format Box</h5>
                    </div>
                </div>
                <div class="col-2" style={{ margin: 'auto', display: responsive.showFirst ? 'none' : 'flex' }}>
                    <Card className='shadow-lg'>
                        <Card.Body>
                            <textarea
                                rows={5}
                                style={{ width: '100%', resize: 'none' }}
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                placeholder='View Images, Audios, Videos and Text'
                            />
                            <div>
                                <h6>Share this</h6>
                                <div className='d-flex justify-content-around'>
                                    <PinterestButton url={url} >
                                        <BsPinterest size={25} />
                                    </PinterestButton>
                                    <TwitterButton url={url} >
                                        <BsTwitter size={25} />
                                    </TwitterButton>
                                    <FacebookButton url={url} appId={2000295180316635}>
                                        <BsFacebook size={25} />
                                    </FacebookButton>
                                    <LinkedInButton url={url}>
                                        <BsLinkedin size={25} />
                                    </LinkedInButton>
                                </div>
                                <button className='openModalButton' onClick={() => { setOpenModal(true) }} >Share</button>
                                {/* <button className='openModalButton' onClick={handleDialogSubmit} >Share</button> */}
                                {openModal && <ShareModal closeModal={setOpenModal} />}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div class="col-1" style={{ margin: 'auto', display: responsive.showFirst ? 'flex' : 'none' }} >
                    <button >Show Output</button>
                </div>
            </div>
        </div>
    )
}

export default MediaNew