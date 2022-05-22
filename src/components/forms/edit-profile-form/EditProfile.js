import './EditProfile.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { textFormatter } from '../../../utils';
import { editProfile } from '../../../store/user-slice';
import { useNavigate } from 'react-router-dom';
import { AddAvatarModal } from '../../add-avatar/AddAvatarModal';

const EditProfile = props => {
  const [readyToUploadAvatarImg, setReadyToUploadAvatarImg] = useState(false);
  const { fullName, userId, avatarUrl, bio, website, username, email } =
    useSelector(state => state.user);
  const [profile, setProfile] = useState({
    fullName,
    avatarUrl,
    bio,
    website,
    username,
    email,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateUserProfileHandler = e => {
    e.preventDefault();

    dispatch(editProfile(profile));

    navigate(`/profile/${userId}`);
  };

  return (
    <>
      <form onSubmit={updateUserProfileHandler} className="edit-profile-form">
        <h2>Update Profile</h2>
        <div className="hr-line thin fad"></div>
        <div className="flex gap center">
          <div className="avatar small">
            {avatarUrl ? <img src={avatarUrl} alt={fullName} /> : fullName[0]}
          </div>
          <div>
            <h3>{fullName}</h3>
            <p
              onClick={() => setReadyToUploadAvatarImg(true)}
              className="text-small text-primary cursor-pointer"
            >
              Change Profile Photo
            </p>
          </div>
        </div>

        <div className="form__row">
          <label>Name</label>
          <input
            type="text"
            value={profile.fullName}
            onChange={e =>
              setProfile(prev => ({
                ...prev,
                fullName: textFormatter(e.target.value?.trim()),
              }))
            }
          />
        </div>
        <div className="form__row">
          <label>Username</label>
          <input
            type="text"
            value={profile.username}
            onChange={e =>
              setProfile(prev => ({
                ...prev,
                username: e.target.value?.trim().toLowerCase(),
              }))
            }
          />
        </div>
        <div className="form__row">
          <label>Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={e =>
              setProfile(prev => ({
                ...prev,
                email: e.target.value?.trim().toLowerCase(),
              }))
            }
          />
        </div>
        <div className="form__row">
          <label>Bio</label>
          <textarea
            rows="5"
            onChange={e =>
              setProfile(prev => ({
                ...prev,
                bio: e.target.value?.trim(),
              }))
            }
          >
            {profile.bio}
          </textarea>
        </div>
        <div className="form__row">
          <label>Website</label>
          <input
            type="text"
            value={profile.website}
            onChange={e =>
              setProfile(prev => ({
                ...prev,
                website: e.target.value?.toLowerCase(),
              }))
            }
          />
        </div>

        <button className="btn-update btn primary" type="submit">
          Update
        </button>
      </form>
      {readyToUploadAvatarImg && (
        <AddAvatarModal onCloseModal={() => setReadyToUploadAvatarImg(false)} />
      )}
    </>
  );
};
export { EditProfile };
