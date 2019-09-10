import React, {Component, Fragment} from 'react';
import Camera, {FACING_MODES, IMAGE_TYPES} from 'react-html5-camera-photo';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import {FaCameraRetro, FaRecycle} from 'react-icons/fa';

export default class FaceAnalyzer extends Component {
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
    }

    onTakePhoto(dataUri) {
        // Do stuff with the photo...
        this.setState({photo: dataUri})
    }

    onCameraError(error) {
        console.error('onCameraError', error);
    }

    onCameraStart(stream) {
        console.log('onCameraStart');
    }

    onCameraStop() {
        console.log('onCameraStop');
    }

    reset = () => {
        this.setState({photo: null})
    }

    onTakePhoto = (dataUri) => {
        // Do stuff with the dataUri photo...
        this.setState({photo: dataUri})
    }

    renderButtons = () => {
        return (
            <div>
                <Button color="info" onClick={(e) => {
                    this.setState({
                        idealFacingModeToggle: !this.state.idealFacingModeToggle,
                        idealFacingMode: this.state.idealFacingModeToggle ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT});
                }}><FaRecycle/></Button>

                {/* <Button color="info" onClick={(e) => {
                    this.setState({idealFacingMode: FACING_MODES.ENVIRONMENT});
                }}> FACING_MODES.ENVIRONMENT </Button> */}

                <Button color="info"><FaCameraRetro/></Button>
            </div>
        );
    }

    render() {
        const {iOS, isChrome} = this.state;
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
                        <Camera
                            onTakePhoto={(dataUri) => {this.onTakePhoto(dataUri);}}
                            onCameraError={(error) => {this.onCameraError(error);}}
                            idealFacingMode={this.state.idealFacingMode}
                            idealResolution={{width: 800, height: 600}}
                            //   imageType = {IMAGE_TYPES.JPG}
                            //   imageCompression = {0.97}
                            isMaxResolution={true}
                            isImageMirror={false}
                            isSilentMode={false}
                            //   isDisplayStartCameraError = {true}
                            isFullscreen={true}
                            //   sizeFactor = {1}
                            onCameraStart={(stream) => {this.onCameraStart(stream);}}
                            onCameraStop={() => {this.onCameraStop();}}
                        />
                        {this.renderButtons()}
                    </div> }
                
                    {`iOS: ${iOS} || Chrome: ${isChrome}`}
            </div >
        );
    }
}
