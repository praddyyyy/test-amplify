import React, { useState, useRef } from 'react'
import { Container, Row, Col, Card, Form, FormControl, Button } from 'react-bootstrap'
import Slider from "react-slick";
import '../App.css'
import art1 from '../assets/images/art-1.webp'
import art2 from '../assets/images/art-2.webp'
import art3 from '../assets/images/art-3.jpeg'
import art4 from '../assets/images/art-4.jpg'
import art5 from '../assets/images/art-5.webp'
import art6 from '../assets/images/art-6.webp'
import art7 from '../assets/images/art-7.webp'
import art8 from '../assets/images/art-8.jpg'

import audio1 from '../assets/audios/audio-1.mp3'
import audio2 from '../assets/audios/audio-2.mp3'
import audio3 from '../assets/audios/audio-3.mp3'
import Xarrow from "react-xarrows";



import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import {
    BsArrowLeft, BsArrowRight, BsPlayFill, BsArrowCounterclockwise, BsInstagram, BsPinterest, BsTwitter, BsFacebook, BsLinkedin
} from 'react-icons/bs'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", backgroundColor: 'black' }}
            onClick={onClick}
        >
            <BsArrowRight />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", backgroundColor: 'black' }}
            onClick={onClick}
        >
            <BsArrowLeft />
        </div>
    );
}


const MediaSynthesis = () => {
    const [inputValue, setInputValue] = useState('');
    const [file, setFile] = useState(null);
    const [AudioSlideIndex, setAudioSlideIndex] = useState(0);
    const [ImageSlideIndex, setImageSlideIndex] = useState(0);
    const [images, setImages] = useState([art1, art2, art3, art4, art5, art6, art7, art8]);
    const [audios, setAudios] = useState([audio1, audio2, audio3]);
    const [selectedImages, setSelectedImages] = useState([]);
    // TODO limit to 5 images selection
    const handleDoubleClick = (image) => {
        if (!selectedImages.includes(image)) {
            setSelectedImages([...selectedImages, image]);
        }
    }

    const fileInput = useRef(null);


    const handleLocalFile = (e) => {
        setFile(e.target.files[0]);
        console.log(file)
    }

    const handleGoogleDrive = () => {
        // Code to handle Google Drive file selection
    }

    const handleDropbox = () => {
        // Code to handle Dropbox file selection
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
        centerPadding: "60px",
        centerMode: true,
        slidesToShow: 5,
        swipeToSlide: true,
        beforeChange: (current, next) => setImageSlideIndex(next),
        // afterChange: function (index) {
        //     console.log(
        //         `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        //     );
        // }
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    const AudioSettings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        centerMode: true,
        slidesToShow: 5,
        dots: true,
        swipeToSlide: true,
        beforeChange: (current, next) => setAudioSlideIndex(next),
        // afterChange: function (index) {
        //     console.log(
        //         `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        //     );
        // }
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };


    return (
        <React.Fragment>
            <Container fluid style={{ height: '100vh', paddingTop: '60px' }}>
                <Row style={{ height: '100%' }}>
                    <Col xs={2} className='d-flex align-items-center justify-content-center'>
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
                    </Col>
                    <Col xs={1}>
                        <Row style={{ height: '100%', paddingTop: '100px', alignItems: 'center' }} >
                            <div id='playButton1'>
                                <BsPlayFill class='play-btn' color='green' onClick={() => window.alert('hi')} size={100} />
                                <h5 style={{ backgroundColor: '#d9d9d9', padding: 5 }}>Theme Dropbox</h5>
                            </div>
                        </Row>
                    </Col>
                    <Col xs={6}>
                        <Row style={{ height: '50%', paddingTop: '100px' }}>
                            <Col xs={6} style={{ height: '100%', width: '100%' }} className='d-flex flex-column justify-content-center' >
                                <div style={{ marginTop: '10px', width: '90%', height: '55%', backgroundColor: '#d9d9d9' }}>
                                    <div id='imageSlider' style={{ marginTop: '15px' }}>
                                        <Slider {...ImageSettings}>
                                            {
                                                images.map((image, index) => (
                                                    <div key={image} className={index === ImageSlideIndex ? 'slide slide-active' : 'slide'} >
                                                        <Button onDoubleClick={() => {
                                                            handleDoubleClick(image)
                                                        }} style={{ borderColor: '#fff', padding: 0, margin: 0 }} >
                                                            <img src={image} className={'image'} alt='art' />
                                                        </Button>
                                                    </div>
                                                ))
                                            }
                                        </Slider>
                                    </div>
                                </div>
                                <div className='d-flex' style={{ alignItems: 'center' }}>
                                    <div className="selected-images" style={{ backgroundColor: 'gray', marginTop: '20px', height: '80px', width: '400px' }}>
                                        {selectedImages.map((image, index) => (
                                            <img key={index} src={image} height='80px' width='80px' alt='img' />
                                        ))}
                                    </div>
                                    <BsArrowCounterclockwise size={50} color='#8f0910' style={{ marginLeft: 20, marginTop: 20 }} />
                                </div>
                            </Col>
                            {/* <Col xs={6} style={{ height: '100%' }} /> */}
                        </Row>
                        <Xarrow start="playButton1" end="imageSlider" />
                        <Row style={{ width: '100%', paddingTop: '100px' }}>
                            <Col xs={6} style={{ height: '100%', width: '100%' }} className='d-flex flex-column align-items-center justify-content-center' >
                                <h1>DreamikAI Media Synthesis</h1>
                                <div style={{ marginTop: '10px', width: '80%' }}>
                                    <Slider {...AudioSettings}>
                                        {audios.map((audio, index) => (
                                            <div key={index} >
                                                <audio controls>
                                                    <source src={audio} type="audio/mpeg" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={1}>
                        <Row style={{ height: '100%', paddingTop: '100px', alignItems: 'center' }} >
                            <div id='playButton2'>
                                <BsPlayFill class='play-btn' color='blue' onClick={() => window.alert('hi')} size={100} />
                                <h5 style={{ backgroundColor: '#d9d9d9', padding: 5 }}>Output Format Dropbox</h5>
                            </div>
                        </Row>
                    </Col>
                    <Xarrow start="imageSlider" end="playButton2" />

                    <Col xs={2} className='d-flex align-items-center justify-content-center'>
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
                                        <BsInstagram size={25} />
                                        <BsPinterest size={25} />
                                        <BsTwitter size={25} />
                                        <BsFacebook size={25} />
                                        <BsLinkedin size={25} />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </React.Fragment >
    )
}

export default MediaSynthesis