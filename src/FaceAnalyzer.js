import React, {Component, Fragment} from 'react';
import Camera, {FACING_MODES, IMAGE_TYPES} from 'react-html5-camera-photo';
import {Link} from 'react-router-dom';

export default class FaceAnalyzer extends Component {
    state = {
        photo: null
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
                <button onClick={(e) => {
                    this.setState({idealFacingMode: FACING_MODES.USER});
                }}> FACING_MODES.USER </button>

                <button onClick={(e) => {
                    this.setState({idealFacingMode: FACING_MODES.ENVIRONMENT});
                }}> FACING_MODES.ENVIRONMENT </button>
            </div>
        );
    }

    render() {

        return (
            <div>
                {this.state.photo ?
                    <div>
                        <div><img src={this.state.photo} alt={this.state.photo.name} /></div>

                        <Link to="/profile">
                            <button>Looks good!</button>
                        </Link>
                        <div><button onClick={this.reset}>Retake?</button></div>
                    </div> : <div>
                        {this.renderButtons()}
                        <Camera
                            onTakePhoto={(dataUri) => {this.onTakePhoto(dataUri);}}
                            onCameraError={(error) => {this.onCameraError(error);}}
                            // idealFacingMode={FACING_MODES.ENVIRONMENT}
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
                        <button>Take photo</button>
                        <input type="file" accept="image/*" />
                        <input type="file" accept="video/*;capture=camcorder" />
                    </div>}

            </div >
        );
    }
}
