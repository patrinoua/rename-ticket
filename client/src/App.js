import React from 'react'
import axios from '../../axios'
import '@contentful/forma-36-react-components/dist/styles.css'

import {
  Container,
  Title,
  ConfigBox,
  ImagesContainer,
  StyledForm,
  StyledTextField,
  Highlight,
  ImageContainer,
  Footer,
  FooterLink
} from './elements'

class App extends React.Component {
  state = {
    url:
      'https://ponderosacommunityclub.org/wp-content/uploads/2019/06/drinking-water.jpg',
    width: '400',
    quality: '50'
  }

  onChange = change => {
    return val => {
      this.setState({
        [change]: String(val.target.value)
      })
    }
  }

  render() {
    const { quality, width, url } = this.state
    return (
      <Container>
        <Title>Resize Images</Title>
        <ConfigBox>
          <StyledForm>
            <StyledTextField
              name='url'
              id='url-textfield'
              value={this.state.url}
              onChange={this.onChange('url')}
              labelText={'Image Url:'}
              textInputProps={{ width: 'large' }}
            ></StyledTextField>
            <div style={{ width: '100%', display: 'flex' }}>
              <StyledTextField
                name='width'
                id='width-textfield'
                value={this.state.width}
                onChange={this.onChange('width')}
                labelText={'Width in px'}
                textInputProps={{
                  width: 'small',
                  type: 'number',
                  max: '600',
                  min: '100'
                }}
              ></StyledTextField>
              <StyledTextField
                name='quality'
                id='quality-textfield'
                value={this.state.quality}
                onChange={this.onChange('quality')}
                labelText={'Quality: 1 - 100%'}
                textInputProps={{
                  width: 'small',
                  type: 'number',
                  max: '100',
                  min: '0'
                }}
              ></StyledTextField>
            </div>
          </StyledForm>
        </ConfigBox>
        <ImagesContainer>
          <ImageContainer>
            <Highlight>Resized Image</Highlight>
            <img
              alt='resizedImage'
              src={`https://angeliki-image-resize-server.herokuapp.com/image?quality=${quality}&width=${width}&url=${url}`}
            />
          </ImageContainer>
          <ImageContainer>
            <Highlight>Original Image</Highlight>
            <img alt='originalImage' src={`${url}`} />
          </ImageContainer>
        </ImagesContainer>
        <Footer>
          <FooterLink href='https://angelikipatrinou.com' target='_blank'>
            Developed by Angeliki Patrinou
          </FooterLink>
        </Footer>
      </Container>
    )
  }
}

export default App