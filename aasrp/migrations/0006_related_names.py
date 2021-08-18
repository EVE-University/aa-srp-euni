# Generated by Django 3.2.6 on 2021-08-18 13:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("eveuniverse", "0005_type_materials_and_sections"),
        ("aasrp", "0005_insurance"),
    ]

    operations = [
        migrations.AlterField(
            model_name="aasrprequest",
            name="ship",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="srp_requests",
                to="eveuniverse.evetype",
            ),
        ),
        migrations.AlterField(
            model_name="aasrprequest",
            name="srp_link",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="srp_requests",
                to="aasrp.aasrplink",
            ),
        ),
        migrations.AlterField(
            model_name="aasrprequestcomment",
            name="srp_request",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="srp_request_comments",
                to="aasrp.aasrprequest",
            ),
        ),
    ]
