export const convertFromKelvToСels = temp => Math.round(temp- 273.15);

export const convertFromUnixToDate = unix => new Date(unix * 1000).getHours();