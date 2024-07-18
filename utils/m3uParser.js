export const parseM3U = (m3uContent) => {
  const lines = m3uContent.split('\n');
  const playlist = [];
  let currentEntry = null;

  lines.forEach(line => {
    line = line.trim();

    if (line.startsWith('#EXTINF:')) {
      // Extract duration
      const durationEndIndex = line.indexOf(',');
      const duration = parseInt(line.substring(8, durationEndIndex), 10);

      // Extract metadata
      const metadata = line.substring(durationEndIndex + 1).trim();
      
      let tvgLogo = '';
      let tvgName = '';
      let groupTitle = '';
      let title = metadata;

      // Extract tvg-logo
      const logoStart = metadata.indexOf('tvg-logo="');
      if (logoStart !== -1) {
        const logoEnd = metadata.indexOf('"', logoStart + 10);
        tvgLogo = metadata.substring(logoStart + 10, logoEnd);
        title = title.replace(metadata.substring(logoStart, logoEnd + 1), '').trim();
      }

      // Extract tvg-name
      const nameStart = metadata.indexOf('tvg-name="');
      if (nameStart !== -1) {
        const nameEnd = metadata.indexOf('"', nameStart + 10);
        tvgName = metadata.substring(nameStart + 10, nameEnd);
        title = title.replace(metadata.substring(nameStart, nameEnd + 1), '').trim();
      }

      // Extract group-title
      const groupStart = metadata.indexOf('group-title="');
      if (groupStart !== -1) {
        const groupEnd = metadata.indexOf('"', groupStart + 13);
        groupTitle = metadata.substring(groupStart + 13, groupEnd);
        title = title.replace(metadata.substring(groupStart, groupEnd + 1), '').trim();
      }

      currentEntry = {
        duration,
        title,
        tvgName,
        tvgLogo,
        groupTitle
      };
    } else if (line && !line.startsWith('#')) {
      // If it's a URL
      if (currentEntry) {
        currentEntry.url = line;
        playlist.push(currentEntry);
        currentEntry = null;
      }
    }
  });

  return playlist;
};
