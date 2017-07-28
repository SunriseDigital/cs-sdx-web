export default class Panel
{
  constructor($elem) {
    this.$self = $elem

    this.$buttonsWrapper = this.$self.find('> .sdx-carousel-panel > .sdx-carousel-btnWrapper')
    this.$buttons = this.$self.find('> .sdx-carousel-panel > .sdx-carousel-btn')
    this.$buttonsWrapper.append(this.$buttons.clone())
    this.$buttons.hide()

    this.childPanels = []
    this.$self.find('> .sdx-carousel-panel > .sdx-carousel-child').each((key, elem) => {
      this.childPanels.push(new Panel($(elem)))
    })
  }
}