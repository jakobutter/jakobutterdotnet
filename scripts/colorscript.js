const fs = require('fs');
const path = require('path');

fs.readFile('color.txt', 'utf8', (err, colorCode) => {
    if (err) {
        console.error('Error reading color.txt:', err);
        return;
    }

    fs.readFile('01.css', 'utf8', (err, cssContent) => {
        if (err) {
            console.error('Error reading styles.css:', err);
            return;
        }

        const updatedCssContent = cssContent.replace(/color:.*?;/, `color: ${colorCode};`);

        // Write the updated content back to styles.css
        fs.writeFile('01.css', updatedCssContent, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to styles.css:', err);
                return;
            }

            console.log('Text color updated successfully!');
        });
    });
});
