$(document).ready(function () {
  $('button').click(function () {
    html2pdf().set({
      html2canvas: {
        // allow using images from remote server
        useCORS: true,
        onclone: (element) => {
          const svgElements = Array.from(element.querySelectorAll('svg'));
          svgElements.forEach(s => {
            // fix incorrect chart size
            const bBox = s.getBBox();
            s.setAttribute("width", bBox.width);
            s.setAttribute("height", bBox.height + bBox.y);
          })
        }
      }
    }).from(document.getElementById('content')).toPdf().get('pdf').then(function (pdf) {
      window.open(pdf.output('bloburl'), '_blank');
    });
  })
})
