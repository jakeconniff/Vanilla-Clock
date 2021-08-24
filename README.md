# Vanilla-Clock

This is a analog clock using Vanilla JavaScript. At initial creation, it was just a normal analog clock in 24-hour orientation, but I've currently added these updates:
- Button added to switch between 24-hour and 12-hour orientation
- Feature added: the background of the clock notes the time of day in reference to the sunrise and sunset, changing from blue to yellow to orange to red to purple for sunset and transitioning in the opposite order for sunrise

Issues Resolved:
- API data wasn't sending correctly at all when using the Sunrise Sunset API, so I switched over to the OpenWeatherMap API for my data
- Sunrise/set timing was greatly inaccurate, due to a misuse of OpenWeatherMap API data. Issue fixed by multiplying the API timing by 1000 before use, since it was stored in unix UTC

Current Issue: While the clock works, when the application is hosted on a server without HTTPS, the geolocator does not work. This causes the current location to come back as null for the essential functionality of the background changer.
