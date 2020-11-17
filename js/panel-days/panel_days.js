export const usePanelDays = async () => {
    setTimeout(() => {
        panel.addEventListener('click', event => {
            if (event.target.id === 'today') {
                console.log('today', today);
            }
    
            if (event.target.id === 'tomorrow') {
                console.log('tomorrow', tomorrow);
            }
    
            if (event.target.id === 'threeDays') {
                console.log('threeDays', threeDays);
            }
    
            if (event.target.id === 'fiveDays') {
                console.log('fiveDays', fiveDays);
            }
        })
    
    }, 1500);
}