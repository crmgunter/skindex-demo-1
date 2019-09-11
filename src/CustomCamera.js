import React, {Component, Fragment} from 'react';
import Camera, {FACING_MODES, IMAGE_TYPES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import {FaCameraRetro, FaRecycle} from 'react-icons/fa';

export default class CustomCamera extends Component {
    state = {
        photo: null,
        idealFacingModeToggle: false,
        idealFacingMode: FACING_MODES.USER
    }

    componentDidMount() {
        const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        console.log(navigator)
        console.log(/CriOS/i.test(navigator.userAgent))
        // var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
        const isChrome = /CriOS/i.test(navigator.userAgent);
        console.log(iOS, isChrome)
        this.setState({iOS, isChrome})
        this.renderVideo();
    }

    renderButtons = () => {
        return (
            <div>
                <Button color="info" onClick={(e) => {
                    this.setState({
                        idealFacingModeToggle: !this.state.idealFacingModeToggle,
                        idealFacingMode: this.state.idealFacingModeToggle ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT
                    });
                }}><FaRecycle /></Button>

                {/* <Button color="info" onClick={(e) => {
                    this.setState({idealFacingMode: FACING_MODES.ENVIRONMENT});
                }}> FACING_MODES.ENVIRONMENT </Button> */}

                <Button color="info" id="container-circles" onClick={this.handleTakePhoto}><FaCameraRetro /></Button>
            </div>
        );
    }

    renderVideo = () => {
        const player = document.getElementById("player");
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        const captureButton = document.getElementById("capture");

        const constraints = {
            video: true
        };

        captureButton.addEventListener("click", () => {
            // Draw the video frame to the canvas.
            console.log(player)
            context.drawImage(player, 0, 0, canvas.width, canvas.height);
            player.srcObject.getVideoTracks().forEach(track => {
                console.log(track)
                this.setState({photo: track})
                track.stop()
            });
        });

        // Attach the video stream to the video element and autoplay.
        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            player.srcObject = stream;
        });
    }

    render() {
        const {iOS, isChrome, idealFacingMode} = this.state;
        return (
            <div>
                {iOS && isChrome ? <input type="file" accept="image/*" /> : this.state.photo ?
                    <div>
                        <div><img src={this.state.photo} alt={this.state.photo.name} /></div>

                        <Link to="/profile">
                            <button>Looks good!</button>
                        </Link>
                        <div><button onClick={this.reset}>Retake?</button></div>
                    </div> : <div>
                        <img src="" alt="blah" id="image" />
                        <video id="player" autoPlay={true}></video>
                        <button id="capture">Capture</button>
                        <canvas id="canvas" width="320" height="240"></canvas>
                        {this.renderButtons()}
                        {this.state.photo}
                    </div>}

                {`iOS: ${iOS} || Chrome: ${isChrome} || Camera facing mode: ${idealFacingMode}`}
            </div >
        );
    }
}
