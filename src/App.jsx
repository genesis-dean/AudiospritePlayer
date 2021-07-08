import React from 'react';
import Howler from 'howler';

export default class App extends React.Component {

	spriteJson = undefined;
	audioFile = undefined;
	audioPlayer = undefined;

	constructor ( props ) {
		super( props );

		this.state = ( {
			selectedAudioFile: undefined,
			selectedJsonFile: undefined,
			couldShowResult: false,
			couldProcess: false,
		} );

		this.onJsonFileChange = this.onJsonFileChange.bind( this );
		this.onAudioFileChange = this.onAudioFileChange.bind( this );
		this.couldExecuted = this.isProcessButtonDisabled.bind( this );
		this.showAudioButtons = this.showAudioButtons.bind( this );
		this.buttonClick = this.buttonClick.bind( this );
		this.checkShowButtons = this.checkShowButtons.bind( this );
		this.processJsonFile = this.processJsonFile.bind( this );
		this.processAudioFile = this.processAudioFile.bind( this );
	}

	processJsonFile ( file ) {
		this.spriteJson = JSON.parse( file ).sprite;

		this.setState( {
			couldProcess: ( this.spriteJson && this.audioFile )
		} );
	}

	processAudioFile ( file ) {
		this.audioFile = file;

		this.setState( {
			couldProcess: ( this.spriteJson && this.audioFile )
		} );
	}

	isProcessButtonDisabled () {
		return !this.state.couldProcess;
	}

	onAudioFileChange ( event ) {
		this.setState( {
			selectedAudioFile: event.target.files[ 0 ]
		}, this.restoreAudioFile );
	}

	onJsonFileChange ( event ) {
		this.setState( {
			selectedJsonFile: event.target.files[ 0 ]
		}, this.restoreJsonFile );
	}

	restoreJsonFile () {
		let jsonFile = new FileReader();
		jsonFile.onload = ( event ) => {
			this.processJsonFile( event.target.result );
		};
		jsonFile.readAsText( this.state.selectedJsonFile );
	}

	restoreAudioFile () {
		let audioFile = new FileReader();
		audioFile.onload = ( event ) => {
			this.processAudioFile( event.target.result );
		};
		audioFile.readAsDataURL( this.state.selectedAudioFile );
	}

	checkShowButtons () {
		this.audioPlayer = new Howler.Howl(
			{
				src: this.audioFile,
				sprite: this.spriteJson
			}
		);

		this.setState( {
			couldShowResult: true
		} );
	}

	buttonClick ( event ) {
		let sprites = Object.keys( this.spriteJson );
		if ( this.audioPlayer && sprites.includes( event.target.name ) ) {
			this.audioPlayer.play( event.target.name );
		}
	}

	showAudioButtons () {
		if ( this.state.couldShowResult ) {
			if ( this.spriteJson ) {
				let buttons = Object.keys( this.spriteJson );
				let aa = buttons.map( ( value, index ) => <input type='button' key={index} value={value} name={value} onClick={this.buttonClick} /> );
				return (
					<div>{aa}</div>
				);
			} else {
				return (
					<div>No Data</div>
				);
			}
		}
	}

	render () {
		return (
			<div>
				<h1>Audiosprite Player</h1>
				<h3>Upload your files:</h3>

				<div>
					<p>
						<input type='file' accept='.mp3, .ogg, .webn, .wav' onChange={this.onAudioFileChange} />
						(.mp3/.ogg/.webm/.wav)
					</p>
				</div>

				<div>
					<p>
						<input type='file' accept='.json' onChange={this.onJsonFileChange} />
						(.json only)
					</p>
				</div>
				<div>
					<p />
					<button onClick={this.checkShowButtons} disabled={this.isProcessButtonDisabled()}>Process</button>
				</div>
				<hr />
				{this.showAudioButtons()}
			</div>
		);
	}
}
