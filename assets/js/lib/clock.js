export default (function () {
    var exports = function (element) {
        this._element = element;
        var html = '';
        for (var i = 0; i < 5; i++) {
            if (i === 2) {
                html += ':';
            } else {
                html += '<span>&nbsp;</span>';
            }
        }
        this._element.innerHTML = html;
        this._slots = this._element.getElementsByTagName('span');
        this._tick();
    };

    let timeAttackSecond = 30;

    exports.prototype = {

        _tick: function () {
            this._update(this._pad(0) + this._pad(timeAttackSecond));
            this._element.dataset.second = String(timeAttackSecond);
            timeAttackSecond--;
            if (timeAttackSecond < 0) return;
            var self = this;
            setTimeout(function () {
                self._tick();
            }, 1000);
        },
        _pad: function (value) {
            return ('0' + value).slice(-2);
        },
        _update: function (timeString) {

            var i = 0, l = this._slots.length, value, slot, now;
            for (; i < l; i++) {

                value = timeString.charAt(i);
                slot = this._slots[i];
                now = slot.dataset.now;

                if (!now) {
                    slot.dataset.now = value;
                    slot.dataset.old = value;
                    continue;
                }

                if (now !== value) {
                    this._flip(slot, value);
                }
            }
        },

        _flip: function (slot, value) {
            // setup new state
            slot.classList.remove('flip');
            slot.dataset.old = slot.dataset.now;
            slot.dataset.now = value;

            // force dom reflow
            slot.offsetLeft;

            // start flippin
            slot.classList.add('flip');
        }
    };
    return exports;
}());
