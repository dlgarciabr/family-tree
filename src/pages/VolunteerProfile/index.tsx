import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { styled } from '@mui/material/styles';

import { Props } from 'types';

import {
  useLazyGetVolunteerByIdQuery,
  useLazyGetUserByIdQuery
} from 'services/volunteerHubApi';

import { GridContainer, GridItem } from 'components/Grid';

import profile from 'assets/images/kendall.jpg';
import profileBg from 'assets/images/profile-bg.jpg';
import { container, gridSkeletonMultipleLines } from 'assets/jss';
import {
  faceImg,
  profileDiv,
  imageDiv,
  main,
  mainRaised,
  description
} from 'assets/jss/pages/volunteerProfile';
import Parallax from 'components/Parallax';
import { AuthenticationContext } from 'context/Authentication';
import { Typography, Skeleton, Grid } from '@mui/material';
import { myProfileFetched } from 'redux/slices/myProfileSlice';
import { RootState } from 'redux/reduxStore';
import { CSSObject } from '@emotion/react';
import { useParams } from 'react-router-dom';

const VolunteerProfile: React.FC<Props> = () => {
  const id = useParams().id;
  const [isMyProfile, setMyProfile] = useState(false);

  const {
    state: { user: signedUser }
  } = React.useContext(AuthenticationContext);
  const [getUserInfo, { isFetching: isFetchingUser }] = useLazyGetUserByIdQuery();
  const [getVolunteerInfo, { isFetching: isFetchingVolunteer }] = useLazyGetVolunteerByIdQuery();
  const dispatch = useDispatch();
  const { myData } = useSelector(
    (state: RootState) => state.myProfile
  );

  const ImgFace = styled('img')(() => (faceImg as CSSObject));
  const DivImage = styled('div')(() => (imageDiv as CSSObject));
  const DivProfile = styled('div')(() => (profileDiv as CSSObject));
  const DivContainer = styled('div')(() => (container as CSSObject));
  const DivMain = styled('div')(() => ({
    ...main as CSSObject,
    ...mainRaised as CSSObject
  }));
  const isFetching = isFetchingUser || isFetchingVolunteer;

  useEffect(() => {
    (
      async () => {
        if (id && signedUser) {
          setMyProfile(signedUser.id === +id);
          const user = isMyProfile ? signedUser : (await getUserInfo({ id: +id }).unwrap());
          const volunteer = await getVolunteerInfo({ id: +id }).unwrap();
          dispatch(myProfileFetched({ ...volunteer, ...user }));
        }
      }
    )();
  }, []);

  return (
    <>
      <h3>{
        isMyProfile ?
          <FormattedMessage id="volunteerProfile.myProfle.header.label" /> :
          <FormattedMessage id="volunteerProfile.header.label" />
      }
      </h3>
      <Parallax image={profileBg} />
      <DivMain>
        <div>
          <DivContainer>
            <GridContainer justifyContent="center">
              <GridItem>
                <DivProfile>
                  <DivImage>
                    {
                      isFetching || !myData ?
                        <Skeleton variant="circular" width={160} height={160} /> :
                        <ImgFace src={profile} alt="..." />
                    }
                  </DivImage>
                  <Grid container justifyContent="center">
                    <Grid item xs={12}>
                      <Typography variant="h4">
                        {`${myData?.firstName} ${myData?.lastName}`}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">
                        {isFetching ? <Skeleton variant="text" width={100} height={35} /> : myData?.title}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={
                        {
                          ...gridSkeletonMultipleLines as React.CSSProperties,
                          ...description as React.CSSProperties
                        }
                      }
                    >
                      {
                        isFetching || !myData ? (
                          <>
                            <Skeleton variant="text" width="100%" height="35" />
                            <Skeleton variant="text" width="80%" height="35" />
                          </>
                        ) :
                          <Typography variant="body1">{myData?.coverLetter}</Typography>
                      }
                      <FormattedMessage id="volunteerProfile.preferedSupport.label" />:
                      {
                        isFetching || !myData ?
                          <Skeleton variant="text" width="100px" height="35" /> :
                          (
                            <FormattedMessage
                              id={
                                `prefered.support.type.${myData?.preferedSupportType ?
                                  myData?.preferedSupportType.toLocaleLowerCase() :
                                  ''
                                }`
                              }
                            />
                          )
                      }
                      <br />
                      <FormattedMessage id="volunteerProfile.preferedLanguages.label" />:
                      {
                        isFetching || !myData ?
                          <Skeleton variant="text" width="100px" height="35" /> :
                          myData?.preferedSupportLanguages
                      }
                      <br />
                      Email:
                      {myData?.email}
                      Telefone:
                      {myData?.phone}
                    </Grid>
                  </Grid>
                  {/* <Button justIcon link >
                    <i className={"fab fa-twitter"} />
                  </Button>
                  <Button justIcon link>
                    <i className={"fab fa-instagram"} />
                  </Button>
                  <Button justIcon link >
                    <i className={"fab fa-facebook"} />
                  </Button> */}
                  {/* </div> */}
                </DivProfile>
              </GridItem>
            </GridContainer>
          </DivContainer>
        </div>
      </DivMain>
    </>
  );
};
export default React.memo(VolunteerProfile);