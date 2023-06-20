"""
User helper
"""

# Django
from django.contrib.auth.models import User

# AA SRP
from aasrp.models import UserSetting


def get_user_settings(user: User) -> UserSetting:
    """
    Get a user's settings or create them
    :param user:
    :return:
    """

    user_settings, _ = UserSetting.objects.get_or_create(user=user)

    return user_settings
