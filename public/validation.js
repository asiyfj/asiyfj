// reference to application form element
$applform = document.getElementById('applform')

var hasAttr = function(list, search) {
  for (var i=0; i<list.length; i++) {
    if (list[i].name === search)
      return true
  }
  return false;
};

var missingWords = function(str) {
  return Boolean(str.split(' ').length < 50)
}

var fiftywords = function(el) {
  var attrs = el.attributes
  return hasAttr(attrs, 'data-fifty')
}

var realString = function(str) {
  return Boolean(String(str).trim().length !== 0)
}

var radiosFromContainer = function(container) {
  var radios = []
  var childs = container.children
  for (var i=0; i<childs.length; i++) {
    radios.push(childs[i].children[0])
  }
  return radios
}

var isRadios = function(el) {
  return el.classList.contains('radios')
}

var validateRadios = function(container) {

  var radios = radiosFromContainer(container)
  var foundSet = false

  for (var i=0; i<radios.length; i++) {
    foundSet = foundSet || radios[i].checked
  }

  return foundSet

}

var isFile = function(el) {
  return Boolean(el.type === 'file')
}

var fileChosen = function(el) {
  return Boolean(el.value.length)
}

var isFilled = function(el) {

  if (isRadios(el))
    return validateRadios(el)

  else if (isFile(el))
    return fileChosen(el)

  // text, date, textarea
  else
    return realString(el.value)

}

var validateFields = function(e) {

  var selectors = [
    '#applform .required input[type=text]',
    '#applform .required input[type=date]',
    '#applform .required textarea',
    '#applform .required .radios',
    '#applform .required input[type=file]'
  ]
  var textInputs = document.querySelectorAll(selectors.join(','))

  var foundInvalid = false
  var invalidate = function(elem) {
    foundInvalid = true
    elem.classList.add('invalid')
  }

  for (var i=0; i<textInputs.length; i++) {

    var input = textInputs[i]
    var value = input.value

    if ((!isFilled(input)) || (fiftywords(input) && missingWords(value)))
      invalidate(input)
    else
      input.classList.remove('invalid')

  }

  if (foundInvalid) {
    e.preventDefault()
    $applform.classList.add('invalidform')
    document.location = '#'
  }

}

$applform.onsubmit = validateFields
