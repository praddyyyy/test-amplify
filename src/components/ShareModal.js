import React from 'react'
import './ShareModal.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import art1 from '../assets/images/art-1.jpg'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { LinkedIn } from 'react-linkedin-login-oauth2';


export const ShareModal = ({ closeModal }) => {

    const handleSuccess = (response) => {
        // Handle the response from the LinkedIn API after successful authentication
        const { access_token } = response;

        // Create a new FormData object to send to the LinkedIn API
        const formData = new FormData();
        formData.append('content', JSON.stringify({
            'title': 'title',
            'description': 'caption',
            'submitted-url': 'https://example.com/my-image.png',
            'submitted-image-url': 'https://example.com/my-image.png',
        }));

        // Make a request to the LinkedIn API to share the image
        fetch('https://api.linkedin.com/v2/ugcPosts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'Content-Type': 'application/json',
                'x-li-format': 'json'
            },
            body: JSON.stringify({
                author: 'urn:li:person:me',
                lifecycleState: 'PUBLISHED',
                specificContent: {
                    'com.linkedin.ugc.ShareContent': formData
                },
                visibility: {
                    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
                }
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    };

    const handleError = (error) => {
        // Handle errors that occur during authentication
        console.error(error);
    };

    return (
        <div className='modalBackground' >
            <div className='modalContainer' >
                <div className='titleCloseBtn'>
                    <button onClick={() => { closeModal(false) }}>X</button>
                </div>
                <div className='title' >
                    <img src={art1} style={{ height: '125px', width: '125px', marginBottom: '10px' }} alt='art' />
                    <h4>Insert Caption here</h4>
                    <FloatingLabel controlId="floatingTextarea2" label="Comments">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                </div>
                <div className='body' >
                    <h5>Add hashtags</h5>
                </div>
                <LinkedIn
                    clientId="8687j8a326arnc"
                    onFailure={handleError}
                    onSuccess={handleSuccess}
                    redirectUri="http://localhost:3000/linkedin-auth"
                >
                    <div className='footer' >
                        <button onClick={() => { closeModal(false) }}>Cancel</button>

                        <button>Continue</button>
                    </div>
                </LinkedIn>
            </div>
        </div >
    )
}
