const getIdFromUrl = (url: string): string => {
  const parts: string[] = url.split('/');
  return parts[parts.length - 2];
};

export default getIdFromUrl;