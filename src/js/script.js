$(function () {
  // Initialize and update the current time display
  function displayCurrentTime() {
    const today = dayjs().format('dddd MMMM DD, YYYY HH:mm');
    $('#currentDay').text(today);
  }
  setInterval(displayCurrentTime, 1000); 

  const workHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]; // Hours to generate

  function generateTimeBlocks() {
    const container = $('.container-fluid'); // Select the container element

    for (let hour of workHours) {
      const timeBlock = $(`
        <div id="hour-${hour}" class="row time-block">
          <div class="col-2 col-md-1 hour text-center py-3">${hour} ${hour < 12 ? 'AM' : 'PM'}</div>
          <textarea class="col-8 col-md-10 description" rows="2"> </textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="far fa-save fa-lg"></i>
          </button>
        </div>
      `);

      container.append(timeBlock); 
    }
  }
  generateTimeBlocks();

  // Save button handling
  $('.saveBtn').on('click', function () {
    const timeBlock = $(this).closest('.time-block');
    const toDoText = timeBlock.find('textarea').val().trim();
    const timeBlockId = timeBlock.attr('id');

    localStorage.setItem(timeBlockId, toDoText);
  });

  // Color-coding time blocks
  function updateBlockColors() {
    const currentHour = dayjs().hour();
    $('.time-block').each(function () {
      $(this).removeClass('past present future');

      const blockHour = parseInt($(this).attr('id').split('-')[1]);
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }
  updateBlockColors(); // Call initially

  // Loading saved data
  $('.time-block').each(function () {
    const blockId = $(this).attr('id');
    const savedToDo = localStorage.getItem(blockId);

    if (savedToDo) {
      $(this).find('textarea').val(savedToDo);
    }
  });
});