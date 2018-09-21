import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor';
import RaisedButton from 'material-ui/RaisedButton';

export default class UploadImage extends Component {
    constructor(props){
        super(props);
        this.state = {

            file: '',
            imagePreviewUrl: '',

            width: 300,
            height: 300,
            border: 50,
            color: [255, 255, 255, 0.6],
            scale: 1,
            rotate: 0,
            croppedImage: '',
            displayed: false
        };
        this.handleScale = this.handleScale.bind(this);
    }

    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result,
            displayed: true
          });
        }
    
        if (file) {
            reader.readAsDataURL(file)
        } else {
            return null;
        }
    }
   
    handleScale(e){
        this.setState({ 
            [e.target.name]: parseInt(e.target.value, 0)
        })
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('CROPPED IMAGE', this.state.croppedImage);
    }

    onClickSave = () => {
        
        if (this.editor) {
        // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
        // drawn on another canvas, or added to the DOM.
        
        const canvas = this.editor.getImage().toDataURL();
            fetch(canvas)
            .then(res => res.blob())
            .then(blob => {
                this.setState({
                    croppedImage: window.URL.createObjectURL(blob)
                })
            });
        
        }
    }
    
    setEditorRef = (editor) => this.editor = editor

    render() {

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;

        if (imagePreviewUrl) {
            $imagePreview = (imagePreviewUrl);
        } else {
            $imagePreview = ("img/avatar.png");
        }

        return (
            <div className='outer-div'>
                <AvatarEditor 
                    ref={this.setEditorRef}
                    image={$imagePreview}
                    width={this.state.width}
                    height={this.state.height}
                    border={this.state.border}
                    color={this.state.color} 
                    scale={this.state.scale}
                    rotate={this.state.rotate}
                />
                <br /><br />
                <div>
                    <input 
                        type="file" 
                        onChange={(e)=>this._handleImageChange(e)} 
                    />
                </div>
                <br />
                <div >Zoom:
                    <input 
                        type="range" 
                        value={this.state.scale} 
                        min='1'
                        max='6' 
                        name='scale' 
                        onChange={ this.handleScale }
                    />
                </div>
                <br />
                <RaisedButton 
                    type='submit'
                    label='preview image'
                    secondary={true}
                    onClick={()=> this.onClickSave()}
                />
                <br />
                <br />
                {/* cropped image */}
                
                    
                <img alt='' height='300' width='300' src={this.state.croppedImage} />
                <br />

                <RaisedButton 
                    type='submit'
                    label='upload image'
                    secondary={true}
                    onClick={(e)=>this._handleSubmit(e)}
                /> 
            </div>
        )
    }
}