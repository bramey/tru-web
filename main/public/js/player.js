/* global bootbox: false, console: false, S: false, moment: false,Amplitude: false */


var playCount = 0;

Amplitude.init({
  'songs': [
    {
      'name': 'Pulled Up',
      'artist': 'Tru',
      'url': 'https://soundcloud.com/bullygang-entertainment/pulled-up',
      'cover_art_url': '../images/Tru-6.jpg'
    },
    {
      'name': 'Get This Paper',
      'artist': 'Tru',
      'url': 'https://soundcloud.com/bullygang-entertainment/tru-get-this-paper-pro-by-jacob-leathal',
      'cover_art_url': '../images/Tru-6.jpg'
    },
    {
      'name': 'Makin Hunnids',
      'artist': 'Tru',
      'url': 'https://soundcloud.com/bullygang-entertainment/tru-makin-hunnids',
      'cover_art_url': '../images/Tru-6.jpg'
    }
  ],
  'soundcloud_client':'iomhTXEZDUKzHt3KYi11vVWHwcdzl22s',
  "callbacks": {
    'after_play': function(){
      playCount++;
      alert( playCount );
    }
  }
});