(function() {
	if (window.addEventListener) {
		window.addEventListener('load', load, false);
	}
	else {
		window.attachEvent('onload', load);
	}
	
	function load() {
		var labelStyle = 'color: white; font-weight: 700; padding-top: 15px; padding-bottom: 3px;';
		var selectStyle = 'margin-left: 15px;';
		
		var wrapper = document.createElement('div');
		var scripts = document.getElementsByTagName('script');
		for (var scriptIndex = 0; scriptIndex < scripts.length; scriptIndex++) {
			if (scripts[scriptIndex].src.indexOf('catalogjs.aspx') >= 0) {
				scripts[scriptIndex].parentNode.appendChild(wrapper);
				break;
			}
		}
		
		var form = document.createElement('form');
		form.method = 'post';
		form.action = '/grahamtool/catalogprocess.aspx?m=done'; //'http://www.809software.com/grahamtool/catalogprocess.aspx?m=done';
		form.onsubmit = SubmitForm;
		
		var hiddenRedirect = document.createElement('input');
		hiddenRedirect.type = 'hidden';
		hiddenRedirect.name = 'r';
		hiddenRedirect.value = 'http://www.grahamtool.com/catalogrequestcomplete.aspx';
		form.appendChild(hiddenRedirect);
		
		var firstNameLabel = document.createElement('div');
		firstNameLabel.style.cssText = labelStyle;
		firstNameLabel.appendChild(document.createTextNode('Your First Name'));
		var requiredLabel = document.createElement('span');
		requiredLabel.style.cssText = 'color: red; padding-left: 3px;';
		requiredLabel.appendChild(document.createTextNode('*'));
		firstNameLabel.appendChild(requiredLabel);
		form.appendChild(firstNameLabel);
		var firstNameInput = document.createElement('input');
		firstNameInput.type = 'text';
		firstNameInput.name = 'first';
		firstNameInput.displayName = 'First Name';
		firstNameInput.maxLength = '50';
		firstNameInput.size = '25';
		form.appendChild(firstNameInput);
		
		var lastNameLabel = document.createElement('div');
		lastNameLabel.style.cssText = labelStyle;
		lastNameLabel.appendChild(document.createTextNode('Your Last Name'));
		requiredLabel = document.createElement('span');
		requiredLabel.style.cssText = 'color: red; padding-left: 3px;';
		requiredLabel.appendChild(document.createTextNode('*'));
		lastNameLabel.appendChild(requiredLabel);
		form.appendChild(lastNameLabel);
		var lastNameInput = document.createElement('input');
		lastNameInput.type = 'text';
		lastNameInput.name = 'last';
		lastNameInput.displayName = 'Last Name';
		lastNameInput.maxLength = '50';
		lastNameInput.size = '25';
		form.appendChild(lastNameInput);
		
		var addressLabel = document.createElement('div');
		addressLabel.style.cssText = labelStyle;
		addressLabel.appendChild(document.createTextNode('Address'));
		requiredLabel = document.createElement('span');
		requiredLabel.style.cssText = 'color: red; padding-left: 3px;';
		requiredLabel.appendChild(document.createTextNode('*'));
		addressLabel.appendChild(requiredLabel);
		form.appendChild(addressLabel);
		var addressInput = document.createElement('input');
		addressInput.type = 'text';
		addressInput.name = 'address';
		addressInput.displayName = 'Address';
		addressInput.maxLength = '50';
		addressInput.size = '50';
		form.appendChild(addressInput);
		
		var cityLabel = document.createElement('div');
		cityLabel.style.cssText = labelStyle;
		cityLabel.appendChild(document.createTextNode('City'));
		requiredLabel = document.createElement('span');
		requiredLabel.style.cssText = 'color: red; padding-left: 3px;';
		requiredLabel.appendChild(document.createTextNode('*'));
		cityLabel.appendChild(requiredLabel);
		form.appendChild(cityLabel);
		var cityInput = document.createElement('input');
		cityInput.type = 'text';
		cityInput.name = 'city';
		cityInput.displayName = 'City';
		cityInput.maxLength = '50';
		cityInput.size = '25';
		form.appendChild(cityInput);
		
		var stateLabel = document.createElement('div');
		stateLabel.style.cssText = labelStyle;
		stateLabel.appendChild(document.createTextNode('State or Provence'));
		requiredLabel = document.createElement('span');
		requiredLabel.style.cssText = 'color: red; padding-left: 3px;';
		requiredLabel.appendChild(document.createTextNode('*'));
		stateLabel.appendChild(requiredLabel);
		form.appendChild(stateLabel);
		var stateInput = document.createElement('input');
		stateInput.type = 'text';
		stateInput.name = 'state';
		stateInput.displayName = 'State/Provence';
		stateInput.maxLength = '50';
		stateInput.size = '25';
		form.appendChild(stateInput);
		
		var zipLabel = document.createElement('div');
		zipLabel.style.cssText = labelStyle;
		zipLabel.appendChild(document.createTextNode('Zip-Postal Code'));
		requiredLabel = document.createElement('span');
		requiredLabel.style.cssText = 'color: red; padding-left: 3px;';
		requiredLabel.appendChild(document.createTextNode('*'));
		zipLabel.appendChild(requiredLabel);
		form.appendChild(zipLabel);
		var zipInput = document.createElement('input');
		zipInput.type = 'text';
		zipInput.name = 'zip';
		zipInput.displayName = 'Zip/Postal Code';
		zipInput.maxLength = '25';
		zipInput.size = '25';
		form.appendChild(zipInput);
		
		var emailLabel = document.createElement('div');
		emailLabel.style.cssText = labelStyle;
		emailLabel.appendChild(document.createTextNode('Your Email Address'));
		requiredLabel = document.createElement('span');
		requiredLabel.style.cssText = 'color: red; padding-left: 3px;';
		requiredLabel.appendChild(document.createTextNode('*'));
		emailLabel.appendChild(requiredLabel);
		form.appendChild(emailLabel);
		var emailInput = document.createElement('input');
		emailInput.type = 'text';
		emailInput.name = 'email';
		emailInput.displayName = 'Email';
		emailInput.size = '50';
		form.appendChild(emailInput);
		
		var hearLabel = document.createElement('div');
		hearLabel.style.cssText = labelStyle;
		hearLabel.appendChild(document.createTextNode('How Did You Hear About Us?'));
		form.appendChild(hearLabel);
		var hearSelect = document.createElement('select');
		hearSelect.name = 'hear';
		hearSelect.style.cssText = selectStyle;
		CreateOptionList(hearSelect, ['Please Choose', 'Cycle World Magazine', 'Popular Mechanics', 'Street Rod Builder Magazine', 'Dust Off/Road Magazine', 'Bodyboarder Magazine', 'Search Engine', 'Discussion Forum', 'Friend', 'Email']);
		form.appendChild(hearSelect);
		
		var employeeLabel = document.createElement('div');
		employeeLabel.style.cssText = labelStyle;
		employeeLabel.appendChild(document.createTextNode('How Many Employees are at Your Facility?'));
		form.appendChild(employeeLabel);
		var employeeSelect = document.createElement('select');
		employeeSelect.name = 'employee';
		employeeSelect.style.cssText = selectStyle;
		CreateOptionList(employeeSelect, ['Please Choose', '1 to 2', '3 to 5', '6 to 10', '11 to 50', '51 to 100']);
		form.appendChild(employeeSelect);
		
		var industryLabel = document.createElement('div');
		industryLabel.style.cssText = labelStyle;
		industryLabel.appendChild(document.createTextNode('What is Your Industry or Field of Work?'));
		form.appendChild(industryLabel);
		var industrySelect = document.createElement('select');
		industrySelect.name = 'industry';
		industrySelect.style.cssText = selectStyle;
		CreateOptionList(industrySelect, ['Please Choose', 'General Automotive', 'Motorcycle', 'Custom and Restoration Automotive', 'Automotive Body Shop', 'Do-It-Yourself Enthusiast', 'Aviation', 'Machinist / Manufacturer', 'Guns', 'Welding', 'Other']);
		form.appendChild(industrySelect);
		
		var budgetLabel = document.createElement('div');
		budgetLabel.style.cssText = labelStyle;
		budgetLabel.appendChild(document.createTextNode('Amount Budgeted for Tools this Year?'));
		form.appendChild(budgetLabel);
		var budgetSelect = document.createElement('select');
		budgetSelect.name = 'budget';
		budgetSelect.style.cssText = selectStyle;
		CreateOptionList(budgetSelect, ['Please Choose', '$100 - $500', '$501 - $1000', '$1001 - $3000', '$3001 - $5000', '$5001 - $10,000']);
		form.appendChild(budgetSelect);
		
		var submitDiv = document.createElement('div');
		submitDiv.style.cssText = 'padding-top: 15px;';
		var submitButton = document.createElement('input');
		submitButton.type = 'image';
		submitButton.src = 'http://02b4fed.netsolstores.com/themes/migration-1/images/buttons/cart_btn_submit.gif';
		submitDiv.appendChild(submitButton);
		form.appendChild(submitDiv);
		
		wrapper.appendChild(form);
	}
	
	function CreateOptionList(selectElement, optionArray) {
		for (var optionIndex = 0; optionIndex < optionArray.length; optionIndex++) {
			var option = document.createElement('option');
			if (optionIndex === 0)
				option.selected = 'selected';
			option.value = optionArray[optionIndex];
			option.appendChild(document.createTextNode(optionArray[optionIndex]));
			selectElement.appendChild(option);
		}
	}
	
	function SubmitForm() {
		for (var index = 0; index < this.elements.length; index++) {
			switch (this.elements[index].name) {
				case "first":
				case "last":
				case "address":
				case "city":
				case "state":
				case "zip":
					if (this.elements[index].value.length === 0) {
						alert('You must enter a ' + this.elements[index].displayName);
						this.elements[index].focus();
						return false;
					}
					break;
				case "email":
					if (this.elements[index].value.length === 0 || !this.elements[index].value.match(/[^\.][a-z0-9\._\%\-\']*@(?:[a-z0-9\-]+\.)+[a-z]+/)) {
						alert('You must enter a valid ' + this.elements[index].displayName);
						this.elements[index].focus();
						return false;
					}
					break;
			}
		}
		
		return true;
	}
})();