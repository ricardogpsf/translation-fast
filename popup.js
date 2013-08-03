function Translate(){
	var self = this;

	var baseUrlService = "http://api.mymemory.translated.net/get"
	var textAreaTranslated = $('#textTranslated')
	var selectedText = ""

	var showDefaultError = function(e){
		console.log(e)
		alert('Oops, ocorreu um erro. Avise-nos sobre isso.')
	}

	var remoteTranslate = function(from, to, text){
		var params = {
			'q': text,
			'langpair': from + "|" + to
		}

		$.ajax({
			url: baseUrlService,
			data: params,
			success: function(result){
				textAreaTranslated.text(result.responseData.translatedText)
			},
			error: function(e){
				showDefaultError(e)
			}
		})
	}


	self.translate = function(from, to, text){

		if(!from || !from.trim() || !to || !to.trim()){
			return
		}


		if(!text){
			// Captura o texto que está selecionado na página
			chrome.tabs.getSelected(null, function(tab){
		    chrome.tabs.executeScript(tab.id, {code: "document.getSelection().toString()"}, function(response) {
		        selectedText = response[0]
		        if(selectedText){
		        	remoteTranslate(from, to, selectedText)
		        }
		    });
		});
		}
	}
}

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  $translate = new Translate()

  $translate.translate('en', 'pt')
});