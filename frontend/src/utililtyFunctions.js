export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // catches 11th to 20th
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    // console.log(`${day}${daySuffix(day)} ${month} ${year}`)
    return `${day}${daySuffix(day)} ${month} ${year}`;
  };
  