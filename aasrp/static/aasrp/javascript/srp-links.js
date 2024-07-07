/* global moment, aaSrpSettings, bootstrap */

$(document).ready(() => {
    'use strict';

    const elementTableSrpLinks = $('#table_tab-srp-links');

    /**
     * Table: SRP Links
     */
    let totalSrpAmount = 0;

    const tableSrpLinks = elementTableSrpLinks.DataTable({
        ajax: {
            url: aaSrpSettings.url.availableSrpLinks,
            dataSrc: '',
            cache: false
        },
        columns: [
            {
                data: 'srp_name',
                className: 'srp-link-fleet-name'
            },
            {
                data: 'creator',
                className: 'srp-link-creator'
            },
            {
                data: 'fleet_time',
                /**
                 * Render callback
                 *
                 * @param data
                 * @returns {*}
                 */
                render: (data) => {
                    return moment(data).utc().format(aaSrpSettings.datetimeFormat);
                },
                className: 'srp-link-fleet-time'
            },
            {
                data: 'fleet_type',
                className: 'srp-link-fleet-type'
            },
            // {
            //     data: 'fleet_commander',
            //     className: 'srp-link-fleet-commander'
            // },
            {
                data: 'fleet_doctrine',
                className: 'srp-link-fleet-doctrine'
            },
            {
                data: 'aar_link',
                className: 'srp-link-aar-link'
            },
            {
                data: 'srp_code',
                render: {
                    display: 'display',
                    _: 'sort'
                },
                className: 'srp-link-code'
            },
            {
                data: 'srp_costs',
                /**
                 * Render callback
                 *
                 * @param data
                 * @param type
                 * @returns {string|*}
                 */
                render: (data, type) => {
                    if (type === 'display') {
                        return `${data.toLocaleString()} ISK`;
                    } else {
                        return data;
                    }
                },
                className: 'srp-link-total-cost text-end'
            },
            {
                data: 'srp_status',
                className: 'srp-link-status'
            },
            {
                data: 'pending_requests',
                className: 'srp-link-pending-requests text-end'
            },
            {
                data: 'actions',
                className: 'srp-link-actions text-end'
            }
        ],
        columnDefs: [
            {
                orderable: false,
                targets: [10]
            },
            {
                width: 115,
                targets: [10]
            }
        ],
        order: [[2, 'asc']],
        paging: aaSrpSettings.dataTable.paging,
        /**
         * When ever a row is created …
         *
         * @param row
         * @param data
         * @param rowIndex
         */
        createdRow: (row, data, rowIndex) => {
            // Row id attr
            $(row)
                .attr('data-row-id', rowIndex)
                .attr('data-srp-code', data.srp_code.sort);

            totalSrpAmount += parseInt(data.srp_costs);

            $('.srp-dashboard-total-isk-cost-amount')
                .html(`${totalSrpAmount.toLocaleString()} ISK`);
        }
    });

    /**
     * When the DataTable has finished rendering and is fully initialized
     */
    tableSrpLinks.on('draw', () => {
        // Show bootstrap tooltips
        [].slice.call(
            document.querySelectorAll(
                '[data-bs-tooltip="aa-srp"]'
            )
        ).map((tooltipTriggerEl) => {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    });

    /**
     * Modals
     */
    const modalEnableSrpLink = $('#enable-srp-link');
    const modalDisableSrpLink = $('#disable-srp-link');
    const modalDeleteSrpLink = $('#delete-srp-link');

    // Enable link modal
    modalEnableSrpLink.on('show.bs.modal', (event) => {
        const button = $(event.relatedTarget);
        const url = button.data('url');
        const name = button.data('name');

        modalEnableSrpLink.find('#modal-button-confirm-enable-srp-link')
            .attr('href', url);
        modalEnableSrpLink.find('.modal-body').html(
            `${aaSrpSettings.translation.modal.enableSrpLink.body}<p class="fw-bold">${name}</p>`
        );
    }).on('hide.bs.modal', () => {
        modalEnableSrpLink.find('.modal-body').html('');
    });

    // Disable link modal
    modalDisableSrpLink.on('show.bs.modal', (event) => {
        const button = $(event.relatedTarget);
        const url = button.data('url');
        const name = button.data('name');

        modalDisableSrpLink.find('#modal-button-confirm-disable-srp-link')
            .attr('href', url);
        modalDisableSrpLink.find('.modal-body').html(
            `${aaSrpSettings.translation.modal.disableSrpLink.body}<p class="fw-bold">${name}</p>`
        );
    }).on('hide.bs.modal', () => {
        modalDisableSrpLink.find('.modal-body').html('');
    });

    // Delete link modal
    modalDeleteSrpLink.on('show.bs.modal', (event) => {
        const button = $(event.relatedTarget);
        const url = button.data('url');
        const name = button.data('name');

        modalDeleteSrpLink.find('#modal-button-confirm-delete-srp-link')
            .attr('href', url);
        modalDeleteSrpLink.find('.modal-body').html(
            `${aaSrpSettings.translation.modal.deleteSrpLink.body}<p class="fw-bold">${name}</p>`
        );
    }).on('hide.bs.modal', () => {
        modalDeleteSrpLink.find('.modal-body').html('');
    });
});
