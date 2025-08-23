import React from 'react';
import { BsTwitter, BsInstagram, BsLinkedin} from 'react-icons/bs';
import { FaFacebookF, FaLinkedinIn, FaGithub} from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className='app__social'>
        <div>
          <a href="https://github.com/mariokarajallo" target='_blank' rel='noreferrer'>
            <FaGithub/>
          </a>

        </div> 
        <div>
          <a href="https://www.linkedin.com/in/mariokarajallo/" target='_blank' rel='noreferrer'>
            <FaLinkedinIn/>
          </a>
            

        </div> 
        <div>
          <a href="https://twitter.com/Mariokarajallo" target='_blank' rel='noreferrer'>
            <BsTwitter/>
          </a>
        </div> 
        <div>
          <a href="https://www.instagram.com/mariokarajallo" target='_blank' rel='noreferrer'>
            <BsInstagram/>
          </a>
        </div> 
    </div>
  )
}

export default SocialMedia