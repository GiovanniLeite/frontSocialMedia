import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import {
  MdOutlineModeEditOutline,
  MdDeleteOutline,
  MdOutlineImage,
  MdOutlineAttachFile,
  MdOutlineGifBox,
  MdOutlineMic,
  MdOutlineMoreHoriz,
} from 'react-icons/md';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import axios from '../../../services/axios';
import { handleApiErrorMessages } from '../../../services/handleApiErrors';
import { postListActions as actions } from '../../../redux/features/postList/slice';

import UserImage from '../../UserImage';
import Loading from '../../Loading';
import { Container } from './styles';

export default function NewPost({ page }) {
  const dispatch = useDispatch();

  const { firstName, picturePath: userPicture } = useSelector((state) => state.auth.user);
  const { errors } = useSelector((state) => state.postList);

  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [showImageBox, setShowImageBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const handlePost = async () => {
    if (!text) return;

    const formData = new FormData();
    formData.append('description', text);
    if (image) {
      formData.append('picture', image);
      formData.append('picturePath', image.name);
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(`/posts/${page}`, formData);

      setText('');
      setImage(null);
      setShowImageBox(false);
      dispatch(actions.setPostList({ posts: data, errors: [] }));
    } catch (e) {
      const errors = handleApiErrorMessages(e);
      dispatch(actions.setPostList({ errors }));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      // Check if the window object is available
      if (typeof window !== 'undefined') setIsMobile(window.innerWidth < 1000);
    };

    // Add the resize event listener using the debounced handler
    const debouncedResizeHandler = debounce(handleWindowResize, 250);
    window.addEventListener('resize', debouncedResizeHandler);

    // Call the handleWindowResize function once initially
    handleWindowResize();

    // Cleanup function to remove the resize event listener
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler);
    };
  }, []);

  return (
    <Container>
      <div className="flexBetween">
        <UserImage image={userPicture} size={50} userName={firstName} />
        <input
          className="newPost"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="No que você está pensando?"
        />
      </div>

      {showImageBox && (
        <div className="addImage">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="flexBetween">
                <div className="dashed" {...getRootProps()}>
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Adicione uma imagem Aqui</p>
                  ) : (
                    <div className="flexBetween" title="Trocar Imagem">
                      <p>{image.name}</p>
                      <MdOutlineModeEditOutline size={20} />
                    </div>
                  )}
                </div>
                {image && (
                  <button className="coloredButton" onClick={() => setImage(null)} title="Remover Imagem">
                    <MdDeleteOutline size={20} />
                  </button>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      )}

      <div className="divider" />

      <div className="flexBetween">
        <button className="flexBetween" onClick={() => setShowImageBox(!showImageBox)}>
          <MdOutlineImage size={20} />
          Imagem
        </button>

        {isMobile ? (
          <button className="flexBetween">
            <MdOutlineMoreHoriz size={20} />
          </button>
        ) : (
          <>
            <button className="flexBetween">
              <MdOutlineGifBox size={20} />
              Clip
            </button>

            <button className="flexBetween">
              <MdOutlineAttachFile size={20} />
              Anexo
            </button>

            <button className="flexBetween">
              <MdOutlineMic size={20} />
              Audio
            </button>
          </>
        )}

        {isLoading ? (
          <Loading size={'25px'} />
        ) : (
          <button className="coloredButton post" onClick={handlePost} title="Enviar Post">
            Publicar
          </button>
        )}
      </div>
      {errors.map((error, index) => (
        <>
          <div className="divider" />
          <p className="error" key={index}>
            {error}
          </p>
        </>
      ))}
    </Container>
  );
}

NewPost.propTypes = {
  page: PropTypes.string.isRequired,
};
