const getAvatarBg = (id: string | number) => `https://schale.gg/images/student/collection/${id}.webp`;
const getAvatarNoBg = (id: string | number) => `https://beta.schaledb.com/images/student/icon/${id}.webp`;

const getVideoPaths = () => {
  const videos = {
    normal: 'https://cdn.discordapp.com/attachments/1231256542419095623/1401825964291391599/normal.gif?ex=6891afaa&is=68905e2a&hm=aab31a05f401e88ebfde417087ac40d8bb5c6aada2dcc197924d94c913e496d2&',
    special: 'https://cdn.discordapp.com/attachments/1231256542419095623/1401825964736122880/special.gif?ex=6891afaa&is=68905e2a&hm=2ba4ba5bbd01a24ce8bd4602f2bb8baf1baff6af1db651d2e660982ce5b2832a&',
  };
  return videos;
};

export { getAvatarBg, getAvatarNoBg, getVideoPaths };
