const colors = ['#960000', '#d0acac', '#FFC0AC', '#E64646', '#FFD700'];  // Add more colors as needed

const getColor = (title) => {
    const index = parseInt(title.split(" ")[1]) % colors.length;
    return colors[index];
  };
  
export  {getColor}