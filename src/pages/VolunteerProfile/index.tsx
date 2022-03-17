import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { styled } from '@mui/material/styles';

import { Props } from 'types';

import {
  useLazyGetVolunteerByIdQuery
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

const VolunteerProfile: React.FC<Props> = () => {
  const {
    state: { user }
  } = React.useContext(AuthenticationContext);

  const [getVolunteerInfo, { isFetching }] = useLazyGetVolunteerByIdQuery();
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

  useEffect(() => {
    (
      async () => {
        if (user?.id) {
          const data = await getVolunteerInfo({ id: user.id }).unwrap();
          dispatch(myProfileFetched(data));
        }
      }
    )();
  }, [user]);

  return (
    <>
      <h3>
        <FormattedMessage id="myprofile.title" />
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
                        {`${user?.firstName} ${user?.lastName}`}
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
                      <FormattedMessage id="myprofile.preferedSupport.label" />:
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
                      <FormattedMessage id="myprofile.preferedLanguages.label" />:
                      {
                        isFetching || !myData ?
                          <Skeleton variant="text" width="100px" height="35" /> :
                          myData?.preferedSupportLanguages
                      }
                      <br />
                      Email:
                      {user?.email}
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